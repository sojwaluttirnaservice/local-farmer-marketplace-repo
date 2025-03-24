const donationsModel = require("../../models/donationsModel")
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const donationsViewController = {


    donations: asyncHandler(async (req, res) => {

        const [donations] = await donationsModel.getAllDonations();

        console.log(donations[0])

        renderPage(res, 'donations/donations-list', { title: 'Donations', donations })
    }),

}

module.exports = donationsViewController