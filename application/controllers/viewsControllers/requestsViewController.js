const foodCategoriesModel = require("../../models/foodCategoriesModel");
const requestsModel = require("../../models/requestsModel")
const asyncHandler = require("../../utils/asyncHandler");
const { getUser } = require("../../utils/functions");
const { renderPage } = require("../../utils/responses/ApiResponse");

const requestsViewController = {

    requests: asyncHandler(async (req, res) => {

        const [requests] = await requestsModel.getAllRequests();

        renderPage(res, 'requests/requests-list', {
            title: 'Requests',
            requests
        })
    }),


    recipientRequests: asyncHandler(async (req, res) => {
        const user = getUser(req)

        const [requests] = await requestsModel.getRequestsByRecipient(user.id)

        renderPage(res, 'recipients/recipient-requests', {
            title: "Requests",
            requests,
            user
        })
    }),


    addRequest: asyncHandler(async (req, res) => {

        let user = getUser(req)
        const [foodCategories] = await foodCategoriesModel.list()

        renderPage(res, 'requests/request-form', {
            title: 'Add Request',
            foodCategories,
            user
        })
    }),
}


module.exports = requestsViewController