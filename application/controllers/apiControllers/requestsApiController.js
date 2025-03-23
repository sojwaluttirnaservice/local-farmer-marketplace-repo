const asyncHandler = require("../../utils/asyncHandler")
const { sendError, sendResponse } = require("../../utils/responses/ApiResponse")
const { FAILURE, SUCCESS } = require("../../utils/responses/executionCodes")

const authApiController = {

    someFunc: asyncHandler(async (req, res) => {

        let err = 'some erro'
        if (err) {
            return sendError(res, 500, FAILURE, 'Something went wrong', null, err)
        }

        // let res = []

        return sendResponse(res, 200, SUCCESS, 'Done successully')
    }),
}

module.exports = authApiController