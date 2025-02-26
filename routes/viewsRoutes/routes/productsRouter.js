const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const productsController = require("../../../application/controllers/productsController");
const getRouter = require("../../utils/getRouter");

const productsRouter = getRouter();


productsRouter.get('/', productsController.renderProductsPage)

productsRouter.get('/add', checkAdminAuth, productsController.renderAddProductPage)



module.exports = productsRouter