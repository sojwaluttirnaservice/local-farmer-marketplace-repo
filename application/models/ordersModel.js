const db = require("../config/db.connect")

const ordersModel = {


    getById: (orderId) => {
        return db.query(`SELECT * FROM orders WHERE id = ?`, [orderId])
    },


    create: (userId) => {

        let q = `INSERT INTO orders
                    (
                        user_id_fk
                    )
                    VALUES 
                    (?)`

        return db.query(q, [userId])
    },


    update: (updateDetails, originalOrderDetails = {}) => {
        let q = `UPDATE orders 
                SET 
                    payment_status = ?,
                    delivery_status = ?,
                    payment_mode = ?,
                    razorpay_payment_id = ?,
                    razorpay_order_id = ?,
                    razorpay_signature = ?
                WHERE  
                    id = ?`


        let updateArray = [
            updateDetails.payment_status || originalOrderDetails?.payment_status,
            updateDetails.delivery_status || originalOrderDetails?.delivery_status,
            updateDetails.payment_mode || originalOrderDetails?.payment_mode,
            updateDetails.razorpay_payment_id || originalOrderDetails?.razorpay_payment_id,
            updateDetails.razorpay_order_id || originalOrderDetails?.razorpay_order_id,
            updateDetails.razorpay_signature || originalOrderDetails?.razorpay_signature,

            updateDetails.id
        ]

        return db.query(q, updateArray)
    },

    /**
         * Fetches all orders placed by a specific user along with ordered items.
         * 
         * @param {number} userId - The ID of the user whose orders are to be fetched.
         * @returns {Promise<Array>} - A promise that resolves to an array containing:
         *   - `total_orders` (number): Total number of orders for the user.
         *   - `orders` (Array): List of orders, where each order contains:
         *      - `id` (number): Order ID.
         *      - `user_id_fk` (number): User ID associated with the order.
         *      - `payment_status` (string): Status of the payment (Pending, Completed, etc.).
         *      - `delivery_status` (string): Status of the order's delivery.
         *      - `payment_mode` (string): Payment method used (ONLINE, CASH).
         *      - `razorpay_payment_id` (string | null): Razorpay payment ID (if applicable).
         *      - `razorpay_order_id` (string | null): Razorpay order ID (if applicable).
         *      - `createdAt` (Date): Timestamp when the order was created.
         *      - `updatedAt` (Date): Timestamp when the order was last updated.
         *      - `ordered_items` (Array): Nested array of ordered items, each containing:
         *          - `id` (number): Ordered product ID.
         *          - `order_id_fk` (number): Order ID to which this item belongs.
         *          - `predefined_product_id_fk` (number): Product ID from predefined products.
         *          - `product_name` (string): Name of the ordered product.
         *          - `quantity` (number): Number of units ordered.
         *          - `price_at_order_time` (number): Price per unit at the time of order.
         *          - `total_price` (number): Total cost (`quantity * price_at_order_time`).
         *          - `createdAt` (Date): Timestamp when the order item was created.
         *          - `updatedAt` (Date): Timestamp when the order item was last updated.
         */
    getOrdersByUserId: (userId) => {
        let q = `
            SELECT 
                -- Total orders count for the user
                COUNT(o.id) AS total_orders,

                -- Aggregated JSON containing orders and their ordered items
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', o.id,
                        'user_id_fk', o.user_id_fk,
                        'payment_status', o.payment_status,
                        'delivery_status', o.delivery_status,
                        'payment_mode', o.payment_mode,
                        'razorpay_payment_id', o.razorpay_payment_id,
                        'razorpay_order_id', o.razorpay_order_id,
                        'createdAt', o.createdAt,
                        'updatedAt', o.updatedAt,

                        -- Nested array for ordered items
                        'ordered_items', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', op.id,
                                    'order_id_fk', op.order_id_fk,
                                    'predefined_product_id_fk', op.predefined_product_id_fk,
                                    'product_name', op.product_name,
                                    'quantity', op.quantity,
                                    'price_at_order_time', op.price_at_order_time,
                                    'total_price', op.total_price,
                                    'createdAt', op.createdAt,
                                    'updatedAt', op.updatedAt
                                )
                            ) 
                            FROM ordered_products op 
                            WHERE op.order_id_fk = o.id
                        )
                    )
                ) AS orders

            FROM orders o
            WHERE o.user_id_fk = ?  -- Fetch orders for the specified user
            GROUP BY o.user_id_fk ;
    `;

    console.log("in hrere");
        return db.query(q, [userId]);
    },

    /**
         * Fetches all orders for all users, grouping orders under each user.
         * 
         * @returns {Promise<Array>} - A promise that resolves to an array containing:
         *   - `users_orders` (Array): List of users with their orders.
         *      - `user_id` (number): User ID.
         *      - `name` (string): User's full name.
         *      - `email` (string): User's email.
         *      - `total_orders` (number): Total number of orders placed by the user.
         *      - `orders` (Array): List of orders for this user, each containing:
         *          - `id` (number): Order ID.
         *          - `payment_status` (string): Status of the payment.
         *          - `delivery_status` (string): Status of the delivery.
         *          - `payment_mode` (string): Payment method used.
         *          - `razorpay_payment_id` (string | null): Transaction ID (if applicable).
         *          
         * - `razorpay_order_id` (string | null): Razorpay order ID (if applicable).

         *          - `createdAt` (Date): Order creation timestamp.
         *          - `updatedAt` (Date): Order update timestamp.
         *          - `ordered_items` (Array): List of ordered items in this order, each containing:
         *              - `id` (number): Ordered product ID.
         *              - `predefined_product_id_fk` (number): Product ID from predefined products.
         *              - `product_name` (string): Name of the ordered product.
         *              - `quantity` (number): Quantity of the product ordered.
         *              - `price_at_order_time` (number): Price per unit at the time of order.
         *              - `total_price` (number): Total cost (`quantity * price_at_order_time`).
         *              - `createdAt` (Date): Timestamp when the order item was created.
         *              - `updatedAt` (Date): Timestamp when the order item was last updated.
         */
    getUsersOrders: () => {
        let q = `
            SELECT 
                -- User details
                u.id AS user_id,
                u.name,
                u.email,
                
                -- Total orders count for the user
                COUNT(o.id) AS total_orders,

                -- Aggregated JSON containing orders and their ordered items
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', o.id,
                        'payment_status', o.payment_status,
                        'delivery_status', o.delivery_status,
                        'payment_mode', o.payment_mode,
                        'razorpay_payment_id', o.razorpay_payment_id,
                        'razorpay_order_id', o.razorpay_order_id,
                        'createdAt', o.createdAt,
                        'updatedAt', o.updatedAt,

                        -- Nested array for ordered items
                        'ordered_items', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', op.id,
                                    'order_id_fk', op.order_id_fk,
                                    'predefined_product_id_fk', op.predefined_product_id_fk,
                                    'product_name', op.product_name,
                                    'quantity', op.quantity,
                                    'price_at_order_time', op.price_at_order_time,
                                    'total_price', op.total_price,
                                    'createdAt', op.createdAt,
                                    'updatedAt', op.updatedAt
                                )
                            ) 
                            FROM ordered_products op 
                            WHERE op.order_id_fk = o.id
                        )
                    )
                ) AS orders

            FROM orders o
            INNER JOIN users u ON o.user_id_fk = u.id  -- Join orders with users
            GROUP BY u.id, u.name, u.email;
    `;

        return db.query(q);
    },


    /**
     * Fetches detailed information of a specific order along with ordered items.
     * 
     * @param {number} orderId - The ID of the order to fetch details for.
     * @returns {Promise<Object>} - A promise that resolves to an object containing:
     *   - `order_id` (number): Order ID.
     *   - `user_id_fk` (number): User ID who placed the order.
     *   - `payment_status` (string): Status of the payment (Pending, Completed, etc.).
     *   - `delivery_status` (string): Status of the order's delivery.
     *   - `payment_mode` (string): Payment method used (ONLINE, CASH).
     *   - `razorpay_payment_id` (string | null): Transaction ID (if applicable).
     *   - `order_date` (Date): Timestamp when the order was created.
     *   - `last_updated` (Date): Timestamp when the order was last updated.
     *   - `total_amount` (number): Total price of the order (`sum(quantity * price_at_order_time)`).
     *   - `ordered_items` (Array): Nested array of ordered items, each containing:
     *       - `id` (number): Ordered product ID.
     *       - `order_id_fk` (number): Order ID to which this item belongs.
     *       - `predefined_product_id_fk` (number): Product ID from predefined products.
     *       - `product_name` (string): Name of the ordered product.
     *       - `quantity` (number): Number of units ordered.
     *       - `price_at_order_time` (number): Price per unit at the time of order.
     *       - `total_price` (number): Total cost (`quantity * price_at_order_time`).
     *       - `createdAt` (Date): Timestamp when the order item was created.
     *       - `updatedAt` (Date): Timestamp when the order item was last updated.
     */
    getOrderDetails: (orderId) => {
        let q = `
            SELECT 
                -- Order details
                o.id AS order_id,
                o.user_id_fk,
                o.payment_status,
                o.delivery_status,
                o.payment_mode,
                o.razorpay_payment_id,
                o.razorpay_order_id,
                DATE_FORMAT(o.createdAt, '%d %b %Y, %H:%i:%s') AS order_date,
                DATE_FORMAT(o.updatedAt, '%d %b %Y, %H:%i:%s') AS last_updated,

                
                -- Calculate total amount for the order
                SUM(op.quantity * op.price_at_order_time) AS total_amount,
    
                -- Fetch ordered product details in JSON format
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', op.id,
                        'order_id_fk', op.order_id_fk,
                        'predefined_product_id_fk', op.predefined_product_id_fk,
                        'product_name', op.product_name,
                        'quantity', op.quantity,
                        'price_at_order_time', op.price_at_order_time,
                        'total_price', op.total_price,
                        'createdAt', op.createdAt,
                        'updatedAt', op.updatedAt
                    )
                ) AS ordered_items
    
            FROM orders AS o
            INNER JOIN ordered_products AS op ON o.id = op.order_id_fk
            WHERE o.id = ?  -- Filter by the given order ID
            GROUP BY o.id;
        `;

        return db.query(q, [orderId]);
    }

}


module.exports = ordersModel


/**
 SAMPLE OUTPUT


{
    "users_orders": [
        {
            "user_id": 5,
            "name": "Rahul Sharma",
            "email": "rahul.sharma@example.com",
            "total_orders": 3,
            "orders": [
                {
                    "id": 101,
                    "payment_status": "Completed",
                    "delivery_status": "Delivered",
                    "payment_mode": "ONLINE",
                    "razorpay_payment_id": "TXN1003",
                    "createdAt": "2025-02-26 12:30:15",
                    "updatedAt": "2025-02-26 12:45:00",
                    "ordered_items": [
                        {
                            "id": 205,
                            "predefined_product_id_fk": 12,
                            "product_name": "Carrot",
                            "quantity": 3,
                            "price_at_order_time": 90.00,
                            "total_price": 270.00,
                            "createdAt": "2025-02-26 12:31:20",
                            "updatedAt": "2025-02-26 12:31:20"
                        }
                    ]
                },
                {
                    "id": 102,
                    "payment_status": "Pending",
                    "delivery_status": "Out for Delivery",
                    "payment_mode": "CASH",
                    "razorpay_payment_id": null,
                    "createdAt": "2025-02-27 10:15:40",
                    "updatedAt": "2025-02-27 10:25:00",
                    "ordered_items": [
                        {
                            "id": 207,
                            "predefined_product_id_fk": 17,
                            "product_name": "Broccoli",
                            "quantity": 1,
                            "price_at_order_time": 40.00,
                            "total_price": 40.00,
                            "createdAt": "2025-02-27 10:16:00",
                            "updatedAt": "2025-02-27 10:16:00"
                        }
                    ]
                }
            ]
        }
    ]
}

 */