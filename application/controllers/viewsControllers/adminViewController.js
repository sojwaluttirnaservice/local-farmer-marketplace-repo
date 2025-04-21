const adminModel = require("../../models/adminModel")
const asyncHandler = require("../../utils/asyncHandler")
const { getUser } = require("../../utils/functions")
const { renderPage } = require("../../utils/responses/ApiResponse")

const adminViewController = {

    dashboard: asyncHandler(async (req, res) => {

        const [stats] = await adminModel.stats()

        const [mostDonatedFoods] = await adminModel.mostDonatedFoods()
        console.log(stats)
        console.log(mostDonatedFoods)
        renderPage(res, 'admin/admin-dashboard', {
            title: 'Dashboard',
            stats: stats[0],
            mostDonatedFoods,
            user: getUser(req)
        })
    }),
}


module.exports = adminViewController