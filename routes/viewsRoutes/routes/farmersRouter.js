const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const farmersController = require("../../../application/controllers/farmersController");
const getRouter = require("../../utils/getRouter");

const farmersRouter = getRouter();

farmersRouter.get('/', checkAdminAuth, farmersController.renderFarmersListPage)

farmersRouter.get('/signup', farmersController.renderSignupPage)



module.exports = farmersRouter