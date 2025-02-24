const farmersController = require("../../../application/controllers/farmersController");
const getRouter = require("../../utils/getRouter");

const farmersApiRouter = getRouter();



farmersApiRouter.post('/signup', farmersController.signup)


module.exports = farmersApiRouter; 