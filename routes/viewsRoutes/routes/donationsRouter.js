const donationsViewController = require("../../../application/controllers/viewsControllers/donationsViewController");
const { checkAdminAuth, checkDonorAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const donationsRouter = getRouter();

donationsRouter.get('/', checkAdminAuth, donationsViewController.donations)

donationsRouter.get('/add', checkDonorAuth, donationsViewController.addDonation)

donationsRouter.get('/u/:userId', checkDonorAuth, donationsViewController.donorsDonations)

module.exports = donationsRouter