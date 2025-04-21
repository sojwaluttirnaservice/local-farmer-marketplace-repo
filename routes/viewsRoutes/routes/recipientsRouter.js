const recipientsViewController = require("../../../application/controllers/viewsControllers/recipientsViewController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const recipientsRouter = getRouter();


recipientsRouter.get('/', checkAdminAuth, recipientsViewController.recipients)


module.exports = recipientsRouter