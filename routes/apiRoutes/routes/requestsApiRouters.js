const { updateRequestStatus, addRequest } = require("../../../application/controllers/apiControllers/requestsApiController");
const { checkAdminAuth, checkRecipientAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const requestsApiRouter = getRouter();

// // 🆕 Create a new food request
requestsApiRouter.post("/", checkRecipientAuth, addRequest);

// // 📋 Get all requests
// requestsApiRouter.get("/requests", getRequests);

// // ✅ Update request status (approve/reject)
requestsApiRouter.put("/status", checkAdminAuth, updateRequestStatus);

// // ❌ Delete a request
// requestsApiRouter.delete("/requests/:id", deleteRequest);

module.exports = requestsApiRouter;
