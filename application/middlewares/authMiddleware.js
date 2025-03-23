const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = {
    checkAdminAuth: asyncHandler(async (req, res, next) => {

        next();
    }),
}

module.exports = authMiddleware