

import toast from "../../utils/toasts.js";
import { getCartDataFromLocalStorage, resetCartDataToLocalStorage } from "./cartHandler.js";




$(() => {

    async function handlePlaceOrder(razorpayResponse, orderData) {

        try {


            let { data: resData } = await axios.post('/api/v1/orders', {
                razorpayResponse,
                orderData
            })


            let { success, message, data } = resData;

            if (!success) {
                toast.error(message)
                return;
            }


            toast.success(`${message}. You are being redirected to your orders page.`);
            resetCartDataToLocalStorage()
            setTimeout(() => {
                console.log('REdirecting thig happening')
                window.open(`/orders/u/${data.user.id}`)
            }, 500)

        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.response?.data?.message || 'Unable to place an order')
        }
    }


    async function handleCreateOrder(e) {
        e.preventDefault();


        let cart = getCartDataFromLocalStorage();


        try {


            let { data: resData } = await axios.post('/api/v1/payment/create-order', cart)

            let { success, message, data } = resData


            if (!success) {
                toast.error(message)
                return;
            }


            console.log(data);

            // IF ORDER IS CREATED 

            let options = {
                "key": `${data.key_id}`,
                "amount": `${data.amount}`,
                "currency": `${data.currency}`,
                "name": `Cart`,
                "description": `${data.description || ''}`,
                "image": `${data.image} || `,
                "order_id": `${data.order_id}`,

                "handler": async (response) => {
                    toast.success('Payment Successful. Dont close this window.');
                    await handlePlaceOrder(response, cart)
                },

                "prefill": {
                    "contact": `${data.user.mobile}`,
                    "name": `${data.user.name}`,
                    "email": `${data.user.email}`,
                },
                "notes": {
                    "description": `${data.description}`
                },
                "theme": {
                    "color": '#2300a3'
                }
            }



            let razorpay = new Razorpay(options)


            console.log(options);

            razorpay.on('payment.failed', (response) => {
                toast.error('Payment Failed. Try again.')
            })

            razorpay.open();
        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.response?.data?.message || 'Unable to create order')
        }
    }

    $(document).on('click', '#checkout-btn', handleCreateOrder)
})