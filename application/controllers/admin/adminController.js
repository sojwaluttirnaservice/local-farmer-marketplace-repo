const farmersModel = require("../../models/farmersModel");
const candidateModel = require("../../models/farmersModel");
const farmersProductsModel = require("../../models/farmerSalesModel");
const predefinedProductsModel = require("../../models/predefinedProductsModel");

const usersModel = require("../../models/usersModel");
const companyModel = require("../../models/usersModel");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const adminController = {

    renderAdminLoginPage: asyncHandler(async (req, res) => {
        if (req.session?.admin) {
            res.redirect('/admin/dashboard');
            return;
        }
        renderPage(res, 'auth/admin-login.ejs', { title: 'Admin Login' })
    }),

    renderDashboardPage: asyncHandler(async (req, res) => {


        let _usersResult = await usersModel.count()

        let _farmersResult = await farmersModel.count()

        let _productsResult = await predefinedProductsModel.totalStockCount()

        let _productCategoriesResult = await predefinedProductsModel.getProductCountByCategoryAll();

        console.log(_productsResult[0][0]);
        console.log(_farmersResult[0]);

        let _renderData = {
            title: 'Admin Dashboard',
            totalUsers: _usersResult[0][0].total_users,
            totalFarmers: _farmersResult[0][0].total_farmers,
            totalProducts: _productsResult[0][0].total_stock,
            productsCategoryWiseCount: JSON.stringify(_productCategoriesResult[0])
        }

        console.log(_renderData);

        renderPage(res, 'admin/admin-dashboard-page.ejs', _renderData)
    })
}

module.exports = adminController;
