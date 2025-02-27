const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const ordersController = require("../../../application/controllers/ordersController");
const getRouter = require("../../utils/getRouter");

const ordersApiRouter = getRouter();

ordersApiRouter.post('/', checkUserAuth, ordersController.add)

ordersApiRouter.put('/', checkUserAuth, ordersController.update)

ordersApiRouter.put('/cancel', checkUserAuth, ordersController.cancel)

ordersApiRouter.get('/', checkUserAuth, ordersController.list)
module.exports = ordersApiRouter