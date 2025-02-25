const farmerSalesModel = require("../models/farmerSalesModel");
const farmersModel = require("../models/farmersModel");
const predefinedProductsModel = require("../models/predefinedProductsModel");
const asyncHandler = require("../utils/asyncHandler")
const { renderPage, sendResponse } = require("../utils/responses/ApiResponse")

const salesController = {
    renderAddSalePage: asyncHandler(async (req, res) => {


        let { farmerId } = req.params;


        let _farmerResult = await farmersModel.getFarmerById(farmerId)


        let _predefinedProductsResult = await predefinedProductsModel.list();


        let renderData = {
            title: 'Add Sale',
            farmer: _farmerResult[0][0],
            predefinedProductsList: _predefinedProductsResult[0]
        }

        // console.log(renderData);

        renderPage(res, 'sales/add-sale.ejs', renderData)

    }),


    renderFarmerSalesHistoryPage: asyncHandler(async (req, res) => {

        let { farmerId } = req.params;
        let _farmerResult = await farmersModel.getFarmerById(farmerId)

        let _farmerSalesResult = await farmerSalesModel.getFarmerSalesHistory(farmerId)

        console.log(_farmerSalesResult[0]);

        let renderData = {
            title: 'Farmer Sales History',
            admin: req.session?.admin,
            farmer: _farmerResult[0][0],
            farmerSalesHistory: _farmerSalesResult[0]
        }

        renderPage(res, 'sales/sales-history.ejs', renderData)

    }),

    // CRUD


    addSale: asyncHandler(async (req, res) => {


        let saleData = req.body;

        // Destructure saleData from req.body
        let {
            farmer_id_fk,
            predefined_product_id_fk,
            stock_quantity,
            price_per_unit_at_transaction,
            sale_date,
            sale_amount,
            payment_status,
            payment_method,
            transaction_id,

        } = saleData

        // Validate required fields (null or empty check)
        if (
            !farmer_id_fk ||
            !predefined_product_id_fk ||
            !stock_quantity ||
            !price_per_unit_at_transaction ||
            !sale_date ||
            !sale_amount ||
            !payment_status
        ) {
            return sendResponse(res, 400, false, 'All fields are required')
            // return res.status(400).json({ error: "All required fields must be provided and non-empty." });
        }


        let _addSaleResult = await farmerSalesModel.add(saleData)

        if (_addSaleResult[0].affectedRows > 0) {
            return sendResponse(res, 200, true, "Sale added successfully")
        } else {
            return sendResponse(res, 400, false, "Failed to add sale")
        }

    })
}

module.exports = salesController