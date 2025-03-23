const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const webPagesController = {

    renderHomePage: asyncHandler(async (req, res) => {
        // Render the homepage with relevant data
        renderPage(res, 'homepage.ejs', {
            title: 'Homepage',
        });
    }),

    renderContactPage: asyncHandler(async (req, res) => {
        renderPage(res, 'web/contact.ejs', {
            title: 'Contact',
        });
    }),

    renderAboutPage: asyncHandler(async (req, res) => {
        renderPage(res, 'web/about.ejs', {
            title: 'About',
        });
    }),

    renderDonatePage: asyncHandler(async (req, res) => {
        renderPage(res, 'web/donate.ejs', {
            title: 'Donate',
        });
    }),
}

module.exports = webPagesController;