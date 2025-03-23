const getRouter = require("../../utils/getRouter");
// const { addDonation, getDonations, updateDonation, deleteDonation } = require("../../controllers/donorController");

const donorsApiRouter = getRouter();

// 🩸 Add a new donation
// donorsApiRouter.post("/donate", addDonation);

// // 📦 Get all donations by logged-in donor
// donorsApiRouter.get("/donations", getDonations);

// // ✏️ Update a specific donation
// donorsApiRouter.put("/donations/:id", updateDonation);

// // ❌ Delete a specific donation
// donorsApiRouter.delete("/donations/:id", deleteDonation);

module.exports = donorsApiRouter;
