const donationsViewController = require("../../../application/controllers/viewsControllers/donationsViewController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const donationsRouter = getRouter();

donationsRouter.get('/', checkAdminAuth, donationsViewController.donations)

module.exports = donationsRouter