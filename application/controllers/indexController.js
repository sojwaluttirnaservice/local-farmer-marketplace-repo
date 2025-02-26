const predefinedProductsModel = require("../models/predefinedProductsModel");
const asyncHandler = require("../utils/asyncHandler");
const { paths } = require("../utils/files/createDirectories");
const { renderPage } = require("../utils/responses/ApiResponse")

const indexController = {


    renderHomePage: asyncHandler(async (req, res) => {
        const { user, farmer, company } = req.session;

        // Redirect users based on their roles
        if (farmer) return res.redirect('/farmer/dashboard');
        if (company) return res.redirect('/admin/dashboard');

        // Define categories dynamically
        const categories = [
            { name: "Vegetables", image: "/assets/images/home/category-section/vegetables.jpg" },
            { name: "Fruits", image: "/assets/images/home/category-section/fruits.jpeg" },
            { name: "Dairy", image: "/assets/images/home/category-section/dairy.avif" },
            { name: "Bakery", image: "/assets/images/home/category-section/bakery.jpeg" }
        ];


        // Do the things over here


        let [_featuredProducts] = await predefinedProductsModel.getProductsByStockCount({ limit: 4 })


        // Render the homepage with relevant data
        renderPage(res, 'homepage.ejs', {
            title: 'Homepage',
            user: user || null,
            categories,
            featuredProducts: _featuredProducts,
            productImageUrl: paths.product.renderPath
        });
    }),


}

module.exports = indexController;