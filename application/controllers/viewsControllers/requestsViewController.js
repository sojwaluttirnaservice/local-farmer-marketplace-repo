const requestsModel = require("../../models/requestsModel")
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const requestsViewController = {

    requests: asyncHandler(async (req, res) => {

        const [requests] = await requestsModel.getAllRequests();

        console.log(requests)

        renderPage(res, 'requests/requests-list', {
            title: 'Requests',
            requests
        })
    }),
}


module.exports = requestsViewController