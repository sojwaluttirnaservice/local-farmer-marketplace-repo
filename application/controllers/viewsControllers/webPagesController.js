const asyncHandler = require("../../utils/asyncHandler");
const { getUser } = require("../../utils/functions");
const { renderPage } = require("../../utils/responses/ApiResponse");

const webPagesController = {

    renderHomePage: asyncHandler(async (req, res) => {
        // Render the homepage with relevant data
        let user = getUser(req)
        renderPage(res, 'homepage.ejs', {
            title: 'Homepage',
            user
        });
    }),

    renderContactPage: asyncHandler(async (req, res) => {
        let user = getUser(req)
        renderPage(res, 'web/contact.ejs', {
            title: 'Contact',
            user
        });
    }),

    renderAboutPage: asyncHandler(async (req, res) => {
        let user = getUser(req)
        renderPage(res, 'web/about.ejs', {
            title: 'About',
            user
        });
    }),

    renderDonatePage: asyncHandler(async (req, res) => {
        let user = getUser(req)
        renderPage(res, 'web/donate.ejs', {
            title: 'Donate',
            user
        });
    }),
}

module.exports = webPagesController;