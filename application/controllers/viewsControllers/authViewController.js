const asyncHandler = require("../../utils/asyncHandler")
const { getUser } = require("../../utils/functions")
const { renderPage } = require("../../utils/responses/ApiResponse")

const authViewController = {

    renderAdminLoginPage: asyncHandler(async (req, res) => {
        renderPage(res, 'auth/admin', { title: 'Admin Login' })
    }),


    renderLoginPage: asyncHandler(async (req, res) => {
        let user = getUser(req);

        if (user) {
            res.redirect('/')
            return
        }
        renderPage(res, 'auth/login-page')
    }),

    renderSignupPage: asyncHandler(async (req, res) => {
        let user = getUser(req)
        if (user) {
            res.redirect('/')
            return
        }
        renderPage(res, 'auth/signup-page')
    }),

}

module.exports = authViewController