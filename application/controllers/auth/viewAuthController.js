const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const viewAuthController = {
    renderLoginPage: asyncHandler(async (req, res) => {
        let session = req.session

        let { user, admin, farmer } = session

        if (user) {
            return res.redirect('/')
        }
        if (admin) {
            return res.redirect('/admin/dashboard')
        }
        if (farmer) {
            return res.redirect('/farmers/dashboard')
        }
        renderPage(res, 'auth/login-page.ejs', { title: 'Login' })
    }),

    renderSignupPage: asyncHandler(async (req, res) => {

        let { r: role } = req.query;


        let session = req.session

        let { user, admin, farmer } = session

        if (user) {
            return res.redirect('/')
        }
        else if (admin) {
            return res.redirect('/admin/dashboard')
        }
        else if (farmer) {
            return res.redirect('/farmers/dashboard')
        }

        // In query role either can be farmer i.e. farmer or user 

        if (role == 'f') {
            renderPage(res, 'auth/farmers-signup-page.ejs', { title: "Signup" })
        } else {
            // role == 'u'
            renderPage(res, 'auth/signup-page.ejs', { title: 'Signup' })
        }
    })
}


module.exports = viewAuthController;
