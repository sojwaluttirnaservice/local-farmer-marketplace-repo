const donorsViewController = require("../../../application/controllers/viewsControllers/donorsViewController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const donorsRouter = getRouter()



donorsRouter.get('/', checkAdminAuth, donorsViewController.donors)

module.exports = donorsRouter