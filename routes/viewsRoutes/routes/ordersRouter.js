const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkAdminOrUserAuth } = require("../../../application/controllers/auth/authController");
const ordersController = require("../../../application/controllers/ordersController");
const getRouter = require("../../utils/getRouter");

const ordersRouter = getRouter();


ordersRouter.get('/', checkAdminAuth, ordersController.renderOrdersPage)

ordersRouter.get('/u/:userId', checkAdminOrUserAuth, ordersController.renderUserOrdersPage)

ordersRouter.get('/o/:orderId', checkAdminOrUserAuth, ordersController.renderOrderDetailsPage)

module.exports = ordersRouter