const asyncHandler = require("../utils/asyncHandler")
const { renderPage } = require("../utils/responses/ApiResponse")

const cartController = {

    renderCartPage: asyncHandler(async (req, res) => {
        renderPage(res, 'cart/cart-page.ejs', { title: 'Cart', user: req.session })
    }),
    add: () => { }

}


module.exports = cartController