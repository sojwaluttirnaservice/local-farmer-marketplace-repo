const db = require("../config/db.connect")
const orderedProductsModel = require("../models/orderedProductsModel")
const ordersModel = require("../models/ordersModel")
const predefinedProductsModel = require("../models/predefinedProductsModel")
const usersModel = require("../models/usersModel")
const asyncHandler = require("../utils/asyncHandler")
const { renderPage, sendResponse } = require("../utils/responses/ApiResponse")
const paymentController = require("./paymentController")

const ordersController = {

    renderOrdersPage: asyncHandler(async (req, res) => {
        renderPage(res, 'orders/orders-list.ejs')
    }),

    renderUserOrdersPage: asyncHandler(async (req, res) => {
        let { userId } = req.params
        let [_users] = await usersModel.getById(userId)
        let [_orderDetails] = await ordersModel.getOrdersByUserId(userId)
        console.log(_orderDetails);
        renderPage(res, 'orders/user-orders.ejs', { title: "User Orders", user: req.session?.user, userDetails: _users[0], orders: _orderDetails[0] })
    }),


    renderOrderDetailsPage: asyncHandler(async (req, res) => {
        let { orderId } = req.params
        let [_order] = await ordersModel.getOrderDetails(orderId)


        console.log(_order?.[0]);
        let [_user] = await usersModel.getById(_order?.[0].user_id_fk);

        renderPage(res, 'orders/order-details.ejs', { title: "Order Details", user: _user[0], orderDetails: _order[0] })
    }),

    add: asyncHandler(async (req, res) => {


        try {

            let { razorpayResponse, orderData } = req.body;

            if (!orderData) {
                return sendResponse(res, 404, false, 'Cart data not found')
            }

            if (!razorpayResponse) {
                return sendResponse(res, 404, false, 'Razorpay data not found')
            }


            let isValidPayment = paymentController.verifyPayment(razorpayResponse);

            if (!isValidPayment) {
                return sendResponse(res, 400, false, 'Invalid payment response')
            }


            db.beginTransaction



            let { id: userId } = req.session.user


            let [_createResult] = await ordersModel.create(userId);


            if (!_createResult) {
                return sendResponse(res, 400, false, 'Unable to create order')
            }

            let orderId = _createResult.insertId


            let [_insertResult] = await orderedProductsModel.insert(orderData, orderId)


            if (_insertResult?.affectedRows != orderData.length) {
                return sendResponse(res, 400, false, 'All cart entries not saved..')
            }


            await predefinedProductsModel.updateMultipleStockCount(orderData)




            let [_orders] = await ordersModel.getById(orderId)

            let order = _orders[0]

            let affectedRows = _insertResult.affectedRows;

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorpayResponse;


            let updateDetails = {
                payment_status: 'Completed',
                delivery_status: null,
                payment_mode: null,
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                id: orderId
            }
            if (affectedRows > 0) {

                let [_updateResult] = await ordersModel.update(updateDetails, order)


                if (_updateResult.affectedRows > 0) {
                    db.commit
                    return sendResponse(res, 200, true, 'Order placed successfully.', { user: req.session.user })
                } else {
                    db.rollback
                }
            }


            return sendResponse(res, 200, false, 'Something went wrong')
        } catch (err) {
            console.error('Error:', err);
            db.rollback
        }


    }),


    update: asyncHandler(async (req, res) => {

    }),


    cancel: asyncHandler(async (req, res) => {

    }),


    list: asyncHandler(async (req, res) => {

    }),
}

module.exports = ordersController