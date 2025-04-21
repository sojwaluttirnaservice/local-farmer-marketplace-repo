const { renderContactPage, renderAboutPage, renderDonatePage, renderHomePage } = require("../../../application/controllers/viewsControllers/webPagesController");
const getRouter = require("../../utils/getRouter");

const webPagesRouter = getRouter();

webPagesRouter.get('/', renderHomePage)

webPagesRouter.get('/contact', renderContactPage)

webPagesRouter.get('/about', renderAboutPage)

webPagesRouter.get('/donate', renderDonatePage)

module.exports = webPagesRouter
