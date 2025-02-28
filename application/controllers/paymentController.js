



const Razorpay = require('razorpay')
const crypto = require('crypto')
const { sendResponse } = require("../utils/responses/ApiResponse")

const asyncHandler = require("../utils/asyncHandler")
const usersModel = require("../models/usersModel")

const razorpayOptions = {
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
}


let PAYMENT_CURRENCY = 'INR'

const razorpay = new Razorpay(razorpayOptions)

const paymentController = {


    createOrder: asyncHandler(async (req, res) => {




        let cart = req.body;


        console.log(cart);

        if (!cart || !Array.isArray(cart) || !cart.length) {
            return sendResponse(res, 404, false, 'Cart not found or invalid format or an empty cart')
        }


        let actualTotalAmount = cart.reduce((total, product) => total + +product.total_price, 0)


        let totalAmount = actualTotalAmount * 100; // MULTIPLYING FOR RAZORPAY


        let { id: userId } = req.session.user;

        // console.log(totalAmount);
        // return;


        let [_users] = await usersModel.getById(userId)


        let user = _users[0]


        let { password, ...userData } = user


        // let recieptId = Math.floor(Math.random() * 10000)
        const options = {
            amount: totalAmount,
            currency: PAYMENT_CURRENCY,
        }



        return razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.error(`Error happened : `, error);
                return sendResponse(res, 500, false, 'Error creating order', null)
            }

            console.log('order details razor');

            console.log(order);
            console.log('order details razor');


            let sendData = {

                order_id: order.id,
                amount: totalAmount,
                currency: PAYMENT_CURRENCY,
                key_id: process.env.RAZORPAY_ID_KEY,
                description: `${user.name}'s Order`,


                user: user,

            }
            return sendResponse(res, 200, true, 'Order created successfully', sendData)
        })



        // console.log(order);


        // sendResponse(res, 200, true, 'done', { order })


    }),


    // not for external use


    // REturns boolean
    verifyPayment: (razorpayData) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorpayData;


        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');



        // returns true of false
        return generatedSignature === razorpay_signature;
    }


}


module.exports = paymentController