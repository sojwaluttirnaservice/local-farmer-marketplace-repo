const ordersModel = require("../models/ordersModel")
const usersModel = require("../models/usersModel")
const asyncHandler = require("../utils/asyncHandler")
const { renderPage } = require("../utils/responses/ApiResponse")

const ordersController = {

    renderOrdersPage: asyncHandler(async (req, res) => {
        renderPage(res, 'orders/orders-list.ejs')
    }),

    renderUserOrdersPage: asyncHandler(async (req, res) => {
        let { userId } = req.params
        let [_users] = await usersModel.getById(userId)
        let [_orderDetails] = await ordersModel.getOrdersByUserId(userId)
        console.log(_orderDetails);
        renderPage(res, 'orders/user-orders.ejs', { title: "User Orders", user: req.session?.user,  userDetails: _users[0], orders: _orderDetails[0] })
    }),


    renderOrderDetailsPage: asyncHandler(async (req, res) => {
        let { orderId } = req.params
        let [_order] = await ordersModel.getOrderDetails(orderId)
  
        renderPage(res, 'orders/order-details.ejs', { title: "Order Details", user: req.session?.user, orderDetails: _order[0] })
    }),

    add: asyncHandler(async (req, res) => {

    }),


    update: asyncHandler(async (req, res) => {

    }),


    cancel: asyncHandler(async (req, res) => {

    }),


    list: asyncHandler(async (req, res) => {

    }),
}

module.exports = ordersController