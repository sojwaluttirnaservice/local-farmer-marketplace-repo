const requestsViewController = require("../../../application/controllers/viewsControllers/requestsViewController");
const { checkAdminAuth, checkRecipientAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const requestsRouter = getRouter();

requestsRouter.get('/', checkAdminAuth, requestsViewController.requests)

requestsRouter.get('/add', checkRecipientAuth, requestsViewController.addRequest)

requestsRouter.get('/u/:userId', checkRecipientAuth, requestsViewController.recipientRequests)

module.exports = requestsRouter