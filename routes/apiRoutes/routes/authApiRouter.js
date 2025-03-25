const authApiController = require("../../../application/controllers/apiControllers/authApiController");
const asyncHandler = require("../../../application/utils/asyncHandler");
const { sendResponse, sendError } = require("../../../application/utils/responses/ApiResponse");
const { SUCCESS, FAILURE } = require("../../../application/utils/responses/executionCodes");
const getRouter = require("../../utils/getRouter");

const authApiRouter = getRouter();

// authApiRouter.post('/register/donor')

// authApiRouter.post('/register/recipient')

authApiRouter.post('/signup', asyncHandler(async (req, res) => {

    let { role } = req.body;


    console.log(req.body)

    if (role == 'donor') {
        return authApiController.registerDonor(req, res)
    }

    if (role == 'recipient') {
        return authApiController.registerRecipient(req, res)
    }

    return sendError(res, 400, FAILURE, 'Select valid role')
}),)


// for amdin login
authApiRouter.post('/admin', authApiController.loginAdmin)

authApiRouter.post('/login', asyncHandler(async (req, res) => {
    const userDetails = req.body
    let { role } = userDetails
    if (role == 'donor') {
        return authApiController.loginDonor(req, res)
    }

    if (role == 'recipient') {
        return authApiController.loginRecipient(req, res)
    }

    return sendError(res, 400, FAILURE, 'Select valid role')
}),)

authApiRouter.post('/logout', asyncHandler(async (req, res) => {
    req.session.user = null;
    return sendResponse(res, 200, SUCCESS, "Logged out successfully")
}),)

// authApiRouter.get('/profile')

module.exports = authApiRouter