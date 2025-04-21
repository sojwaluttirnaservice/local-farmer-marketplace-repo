const donationsModel = require("../../models/donationsModel");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/responses/ApiResponse");
const { SUCCESS } = require("../../utils/responses/executionCodes");

const donationsApiController = {

    addDonation: asyncHandler(async (req, res) => {
        const donationData = req.body
        const [saveResult] = await donationsModel.createDonation(donationData)

        if (saveResult.affectedRows > 0) {
            return sendResponse(res, 200, SUCCESS, 'Donation added successfully')
        }

    }),
}

module.exports = donationsApiController