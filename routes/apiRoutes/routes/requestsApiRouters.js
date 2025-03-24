const { updateRequestStatus } = require("../../../application/controllers/apiControllers/requestsApiController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const getRouter = require("../../utils/getRouter");

const requestsApiRouter = getRouter();

// // 🆕 Create a new food request
// requestsApiRouter.post("/requests", createRequest);

// // 📋 Get all requests
// requestsApiRouter.get("/requests", getRequests);

// // ✅ Update request status (approve/reject)
requestsApiRouter.put("/status", checkAdminAuth, updateRequestStatus);

// // ❌ Delete a request
// requestsApiRouter.delete("/requests/:id", deleteRequest);

module.exports = requestsApiRouter;
