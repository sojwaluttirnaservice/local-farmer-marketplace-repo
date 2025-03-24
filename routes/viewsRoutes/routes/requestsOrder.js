const requestsViewController = require("../../../application/controllers/viewsControllers/requestsViewController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const requestsRouter = getRouter();

requestsRouter.get('/', checkAdminAuth, requestsViewController.requests)

module.exports = requestsRouter