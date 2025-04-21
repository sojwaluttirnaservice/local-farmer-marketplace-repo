const { addDonation } = require("../../../application/controllers/apiControllers/donationsApiController");
const { checkDonorAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");
const donationsApiRouter = require("./donationsApiRouter");
// const { assignDelivery, getDistributions, updateDeliveryStatus } = require("../../controllers/distributionController");

const distributionsApiRouter = getRouter();

donationsApiRouter.post('/', checkDonorAuth, addDonation)
// 🚚 Assign a delivery
// distributionsApiRouter.post("/distribution", assignDelivery);

// // 📋 Get all distributions
// distributionsApiRouter.get("/distribution", getDistributions);

// // ✅ Update delivery status (pending → on_the_way → delivered)
// distributionsApiRouter.put("/distribution/:id", updateDeliveryStatus);

module.exports = distributionsApiRouter;
