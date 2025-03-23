const asyncHandler = require("../../utils/asyncHandler")
const { renderPage } = require("../../utils/responses/ApiResponse")

const adminViewController = {

    dashboard: asyncHandler(async (req, res) => {
        renderPage(res, 'admin/admin-dashboard')
    }),
}


module.exports = adminViewController