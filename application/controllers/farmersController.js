const farmersModel = require("../models/farmersModel")
const asyncHandler = require("../utils/asyncHandler")
const { renderPage, sendResponse } = require("../utils/responses/ApiResponse")

const farmersController = {


    renderFarmersPage: asyncHandler(async (req, res) => {
        const admin = req.session?.admin

        const _farmersResult = await farmersModel.list();

        renderPage(res, 'farmers/farmers-page.ejs', { admin, farmers: _farmersResult[0] })
    }),


    renderSignupPage: asyncHandler(async (req, res) => {
        const admin = req.session?.admin


        if (process.env.PROJECT_ENV != 'PROD') {
            req.session.admin = { role: 'admin' }
        }


        console.log(admin);
        renderPage(res, 'farmers/farmers-signup', { admin })
    }),


    signup: asyncHandler(async (req, res) => {
        const farmerData = req.body;
        const { farmer_name, email, password, mobile, farm_name } = farmerData;

        // Check for empty essential fields
        if (!farmer_name || !email || !password || !mobile || !farm_name) {
            return sendResponse(res, 400, false, 'Fill the required fields')
        }
        const [_result, _metadata] = await farmersModel.add(farmerData);
        let { admin } = req.session
        if (_result.affectedRows > 0) {
            return sendResponse(res, 201, true, admin ? 'Farmer Added Successfully' : 'Signup Successfull')
        }
    })

}


module.exports = farmersController