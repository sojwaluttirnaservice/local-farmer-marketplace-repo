const { checkAdminOrFarmerAuth } = require("../../../application/controllers/auth/authController");
const salesController = require("../../../application/controllers/salesController");
const getRouter = require("../../utils/getRouter");

const salesApiRouter = getRouter();

salesApiRouter.post('/', checkAdminOrFarmerAuth, salesController.addSale)

module.exports = salesApiRouter