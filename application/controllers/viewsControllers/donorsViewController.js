const donorsModel = require("../../models/donorsModel")
const asyncHandler = require("../../utils/asyncHandler")
const { renderPage } = require("../../utils/responses/ApiResponse")

const donorsViewController = {

    donors: asyncHandler(async (req, res) => {

        const [donors] = await donorsModel.getAllDonors()

        renderPage(res, 'donors/donors-list', { donors })
    }),
}

module.exports = donorsViewController