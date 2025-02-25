const { checkAdminOrFarmerAuth } = require("../../../application/controllers/auth/authController");
const salesController = require("../../../application/controllers/salesController");
const getRouter = require("../../utils/getRouter");

const salesRouter = getRouter();

salesRouter.get('/add/:farmerId', checkAdminOrFarmerAuth, salesController.renderAddSalePage)

salesRouter.get('/history/:farmerId', checkAdminOrFarmerAuth, salesController.renderFarmerSalesHistoryPage)


module.exports = salesRouter