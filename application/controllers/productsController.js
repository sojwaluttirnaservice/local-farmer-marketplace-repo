const predefinedProductsModel = require("../models/predefinedProductsModel");
const asyncHandler = require("../utils/asyncHandler");
const { sendResponse, renderPage } = require("../utils/responses/ApiResponse");

const productsController = {


    // VIEWS CONTROLLER

    renderAddProductPage: asyncHandler(async (req, res) => {


        const _predefinedProductResult = await predefinedProductsModel.list()


        renderPage(res, 'products/add.ejs', { title: 'Add Product', admin: req.session?.admin, predefinedProductsList: _predefinedProductResult[0] })

    }),



    // API CONTRROLLER

    add: asyncHandler(async (req, res) => {

        let predefinedProductDetails = req.body;
        if (!predefinedProductDetails) {
            return sendResponse(res, 400, false, 'Kindly share the product details');
        }
        // Add new product to the database
        
        let { product_name, description, price_per_unit, category, unit_of_measurement } = predefinedProductDetails
        
        if (!product_name || !description || !price_per_unit || !category || !unit_of_measurement) {
            return sendResponse(res, 400, false, 'All fields are required');
        }
        
        const _addResult = await predefinedProductsModel.add(predefinedProductDetails)

        if (_addResult[0].affectedRows > 0) {
            return sendResponse(res, 201, true, 'Product added successfully');
        }
    })
}



module.exports = productsController