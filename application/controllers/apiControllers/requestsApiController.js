const donationsModel = require("../../models/donationsModel");
const requestsModel = require("../../models/requestsModel");
const asyncHandler = require("../../utils/asyncHandler")
const { sendError, sendResponse } = require("../../utils/responses/ApiResponse")
const { FAILURE, SUCCESS } = require("../../utils/responses/executionCodes")

const authApiController = {


    addRequest: asyncHandler(async (req, res) => {
        let requestData = req.body
        let { recipient_id, food_category_id, quantity } = requestData

        // Validate if recipient_id is provided
        if (!recipient_id) {
            return sendError(res, 400, FAILURE, 'Recipient id is missing')
        }

        // Validate if food_category_id is provided
        if (!food_category_id) {
            return sendError(res, 400, FAILURE, 'Food category not selected')
        }

        // Validate if quantity is provided and is a valid number
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return sendError(res, 400, FAILURE, 'Invalid quantity provided')
        }


        const [saveResult] = await requestsModel.createRequest(requestData)

        if (saveResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, "Request Created")
        }
    }),

    updateRequestStatus: asyncHandler(async (req, res) => {
        const { request_id, status, food_category_id, quantity } = req.body;

        if (!request_id || !status) {
            return sendError(res, 400, FAILURE, 'Request ID or status missing.');
        }

        // If request is rejected, update status directly
        if (status?.toLowerCase() === 'rejected') {
            const [updateResult] = await requestsModel.updateRequestStatus(request_id, status);
            if (updateResult.affectedRows > 0) {
                return sendResponse(res, 200, SUCCESS, 'Request Rejected Successfully');
            }
        }

        // Fetch available donations sorted by quantity (largest first)
        const [availableDonations] = await donationsModel.getDonationsByFoodCategory(food_category_id);

        let remainingQuantity = quantity;
        let donationsToUpdate = [];

        for (let donation of availableDonations) {
            if (remainingQuantity <= 0) break; // Stop if request is fully satisfied

            let deductedQuantity = Math.min(donation.quantity, remainingQuantity);
            donationsToUpdate.push({ id: donation.id, newQuantity: donation.quantity - deductedQuantity });

            remainingQuantity -= deductedQuantity;
        }

        // If total available quantity is insufficient, return an error
        if (remainingQuantity > 0) {
            return sendError(res, 400, FAILURE, 'Not enough quantity available.');
        }

        // Deduct quantity from multiple donations
        for (let donation of donationsToUpdate) {
            await donationsModel.updateDonationQuantity(donation.id, donation.newQuantity);
        }

        // Update request status
        const [updateResult] = await requestsModel.updateRequestStatus(request_id, status);

        if (updateResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Request Accepted Successfully');
        } else {
            return sendError(res, 400, FAILURE, 'Failed to update request status.');
        }
    }),

}

module.exports = authApiController