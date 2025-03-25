const asyncHandler = require("../utils/asyncHandler");
const { getUser, isGet } = require("../utils/functions");
const { sendError } = require("../utils/responses/ApiResponse");
const { FAILURE } = require("../utils/responses/executionCodes");


const authMiddleware = {
    checkAdminAuth: asyncHandler(async (req, res, next) => {
        let user = getUser(req);


        if (user?.role == 'admin') {
            next()
            return
        }


        if (isGet(req)) {
            res.redirect('/')
            return;
        }

        return sendError(res, 401, FAILURE, 'Unauthorized')
    }),

    checkDonorAuth: asyncHandler(async (req, res, next) => {

        let user = getUser(req);

        if (user?.role == 'donor') {
            next()
            return
        }


        if (isGet(req)) {
            res.redirect('/')
            return;
        }

        return sendError(res, 401, FAILURE, 'Unauthorized')
    }),


    checkRecipientAuth: asyncHandler(async (req, res, next) => {

        let user = getUser(req);

        if (user?.role == 'recipient') {
            next()
            return;
        }


        if (isGet(req)) {
            res.redirect('/')
            return;
        }

        return sendError(res, 401, FAILURE, 'Unauthorized')
    }),
}

module.exports = authMiddleware