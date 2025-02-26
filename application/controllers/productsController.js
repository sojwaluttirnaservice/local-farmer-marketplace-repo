const predefinedProductsModel = require("../models/predefinedProductsModel");
const asyncHandler = require("../utils/asyncHandler");
const { paths } = require("../utils/files/createDirectories");
const { sendResponse, renderPage } = require("../utils/responses/ApiResponse");

const productsController = {


    // VIEWS CONTROLLER

    renderProductsPage: asyncHandler(async (req, res) => {



        let session = req.session;
        let { admin, user, farmer } = session;



        let [_products, _] = await predefinedProductsModel.getProductsByStockCount();

        renderPage(res, 'products/products-page.ejs', { title: "Products", user, products: _products, productImageUrl: paths.product.renderPath })
    }),

    renderAddProductPage: asyncHandler(async (req, res) => {


        const _predefinedProductResult = await predefinedProductsModel.list()
        let session = req.session;


        renderPage(res, 'products/add.ejs', {
            title: 'Add Product',
            admin: req.session?.admin,
            ...session,
            predefinedProductsList: _predefinedProductResult[0],
            productImageUrl: paths.product.renderPath
        })

    }),



    // API CONTRROLLER

    add: asyncHandler(async (req, res) => {

        let predefinedProductDetails = req.body;
        if (!predefinedProductDetails) {
            return sendResponse(res, 400, false, 'Kindly share the product details');
        }


        if (!req.files?.product_photo) {
            return sendResponse(res, 400, false, 'Upload a  product image')
        }


        let product_photo = req.files.product_photo;

        console.log(product_photo);


        // Create a unique filename
        let [ext, ...name] = product_photo.name?.split('.')?.reverse()

        let filename = `product_${Date.now()}_${Math.ceil(Math.random() * 10000)}_${name.join('-')}.${ext}`;

        let savePath = `${paths.product.directoryPath}/${filename}`;


        await product_photo.mv(savePath)


        // Add new product to the database

        let { product_name, description, price_per_unit, category, unit_of_measurement } = predefinedProductDetails

        if (!product_name || !description || !price_per_unit || !category || !unit_of_measurement) {
            return sendResponse(res, 400, false, 'All fields are required');
        }

        const _addResult = await predefinedProductsModel.add({ ...predefinedProductDetails, image_name: filename })

        if (_addResult[0].affectedRows > 0) {
            return sendResponse(res, 201, true, 'Product added successfully');
        }
    })
}



module.exports = productsController