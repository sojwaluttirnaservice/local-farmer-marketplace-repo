const { checkAdminOrFarmerAuth } = require("../../../application/controllers/auth/authController");
const productsController = require("../../../application/controllers/productsController");
const getRouter = require("../../utils/getRouter");

const productsApiRouter = getRouter();

productsApiRouter.post('/p', checkAdminOrFarmerAuth, productsController.add)


module.exports = productsApiRouter