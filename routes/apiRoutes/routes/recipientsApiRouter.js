const getRouter = require("../../utils/getRouter");
// const { getRecipients, getRecipientById, updateRecipient, deleteRecipient } = require("../../controllers/recipientController");

const recipientsApiRouter = getRouter();

// // 📋 Get all recipients
// recipientsApiRouter.get("/recipients", getRecipients);

// // 🔍 Get a recipient by ID
// recipientsApiRouter.get("/recipients/:id", getRecipientById);

// // ✏️ Update recipient details
// recipientsApiRouter.put("/recipients/:id", updateRecipient);

// // ❌ Delete a recipient
// recipientsApiRouter.delete("/recipients/:id", deleteRecipient);

module.exports = recipientsApiRouter;
