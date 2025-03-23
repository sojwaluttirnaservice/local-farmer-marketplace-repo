const asyncHandler = require("../../utils/asyncHandler")
const { renderPage } = require("../../utils/responses/ApiResponse")

const authViewController = {

    renderAdminLoginPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/admin', { title: 'Admin Login' })
    }),
}

module.exports = authViewController