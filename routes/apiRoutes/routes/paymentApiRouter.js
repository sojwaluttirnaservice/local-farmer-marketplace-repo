const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const paymentController = require("../../../application/controllers/paymentController");
const getRouter = require("../../utils/getRouter");

const paymentApiRouter = getRouter();



paymentApiRouter.post('/create-order', checkUserAuth, paymentController.createOrder)


module.exports = paymentApiRouter