const getRouter = require("../../utils/getRouter");
// const { createRequest, getRequests, updateRequestStatus, deleteRequest } = require("../../controllers/requestController");

const requestsApiRouter = getRouter();

// // 🆕 Create a new food request
// requestsApiRouter.post("/requests", createRequest);

// // 📋 Get all requests
// requestsApiRouter.get("/requests", getRequests);

// // ✅ Update request status (approve/reject)
// requestsApiRouter.put("/requests/:id", updateRequestStatus);

// // ❌ Delete a request
// requestsApiRouter.delete("/requests/:id", deleteRequest);

module.exports = requestsApiRouter;
