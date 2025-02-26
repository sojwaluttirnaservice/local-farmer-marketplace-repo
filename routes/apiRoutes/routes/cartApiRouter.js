const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const cartController = require("../../../application/controllers/cartController");
const getRouter = require("../../utils/getRouter");

const cartApiRouter = getRouter();


cartApiRouter.post('/', checkUserAuth, cartController.add)


module.exports = cartApiRouter