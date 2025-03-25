const { addDonation } = require("../../../application/controllers/apiControllers/donationsApiController");
const { checkDonorAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");
// const { getAllDonations, getDonationById, markDonationAsCompleted } = require("../../controllers/donationController");

const donationsApiRouter = getRouter();

donationsApiRouter.post('/', checkDonorAuth, addDonation)

// // 📋 Get all donations
// donationsApiRouter.get("/donations", getAllDonations);

// // 🔍 Get a specific donation by ID
// donationsApiRouter.get("/donations/:id", getDonationById);

// // ✅ Mark a donation as completed
// donationsApiRouter.put("/donations/:id/complete", markDonationAsCompleted);

module.exports = donationsApiRouter;
