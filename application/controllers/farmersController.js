const farmersModel = require("../models/farmersModel")
const predefinedProductsModel = require("../models/predefinedProductsModel")
const asyncHandler = require("../utils/asyncHandler")
const { renderPage, sendResponse } = require("../utils/responses/ApiResponse")

const farmersController = {


    renderFarmersListPage: asyncHandler(async (req, res) => {
        const admin = req.session?.admin

        const _farmersResult = await farmersModel.list();




        let renderData = {
            title: 'Farmers List',
            admin,
            farmersList: _farmersResult[0],

        }

        renderPage(res, 'farmers/farmers-list-page.ejs', renderData)
    }),


    renderSignupPage: asyncHandler(async (req, res) => {


        if (process.env.PROJECT_ENV != 'PROD') {
            req.session.admin = { role: 'admin' }
        }

        const admin = req.session?.admin

        console.log(admin);
        renderPage(res, 'farmers/farmers-signup', { title: admin ? 'Add Farmer Page' : "Signup page", admin })
    }),


    signup: asyncHandler(async (req, res) => {
        const farmerData = req.body;
        const { farmer_name, email, password, mobile, farm_name } = farmerData;

        // Check for empty essential fields
        console.log(farmerData)
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