const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const cartController = require("../../../application/controllers/cartController");
const getRouter = require("../../utils/getRouter");

const cartRouter = getRouter();


cartRouter.get('/', checkUserAuth, cartController.renderCartPage)


module.exports = cartRouter