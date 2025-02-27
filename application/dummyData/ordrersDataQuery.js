/**

START TRANSACTION;

-- Insert 20 Orders
INSERT INTO orders (user_id_fk, payment_status, delivery_status, payment_mode, payment_transaction_number, createdAt, updatedAt) VALUES
(1, 'Completed', 'Delivered', 'ONLINE', 'TXN1001', NOW(), NOW()),
(2, 'Completed', 'Delivered', 'CASH', NULL, NOW(), NOW()),
(3, 'Pending', 'Not Dispatched', 'ONLINE', 'TXN1002', NOW(), NOW()),
(4, 'Completed', 'Out for Delivery', 'CASH', NULL, NOW(), NOW()),
(5, 'Completed', 'Delivered', 'ONLINE', 'TXN1003', NOW(), NOW()),
(6, 'Pending', 'Not Dispatched', 'CASH', NULL, NOW(), NOW()),
(7, 'Failed', 'Not Dispatched', 'ONLINE', 'TXN1004', NOW(), NOW()),
(8, 'Refunded', 'Delivered', 'ONLINE', 'TXN1005', NOW(), NOW()),
(9, 'Completed', 'Out for Delivery', 'CASH', NULL, NOW(), NOW()),
(10, 'Pending', 'Not Dispatched', 'ONLINE', 'TXN1006', NOW(), NOW()),
(11, 'Completed', 'Delivered', 'CASH', NULL, NOW(), NOW()),
(12, 'Completed', 'Delivered', 'ONLINE', 'TXN1007', NOW(), NOW()),
(13, 'Failed', 'Not Dispatched', 'ONLINE', 'TXN1008', NOW(), NOW()),
(14, 'Pending', 'Out for Delivery', 'CASH', NULL, NOW(), NOW()),
(15, 'Completed', 'Delivered', 'ONLINE', 'TXN1009', NOW(), NOW()),
(1, 'Completed', 'Delivered', 'CASH', NULL, NOW(), NOW()),
(2, 'Pending', 'Not Dispatched', 'ONLINE', 'TXN1010', NOW(), NOW()),
(3, 'Completed', 'Out for Delivery', 'CASH', NULL, NOW(), NOW()),
(4, 'Refunded', 'Delivered', 'ONLINE', 'TXN1011', NOW(), NOW()),
(5, 'Completed', 'Delivered', 'CASH', NULL, NOW(), NOW());

-- Insert Ordered Products for these Orders
INSERT INTO ordered_products (order_id_fk, predefined_product_id_fk, product_name, quantity, price_at_order_time, total_price, createdAt, updatedAt) VALUES
(1, 5, 'Red Apple', 3, 22.00, 66.00, NOW(), NOW()),
(2, 10, 'Mango Alphonso', 2, 60.00, 120.00, NOW(), NOW()),
(3, 7, 'Turmeric Powder', 1, 120.00, 120.00, NOW(), NOW()),
(4, 2, 'Fresh Potato', 5, 20.00, 100.00, NOW(), NOW()),
(5, 15, 'Black Pepper', 2, 60.00, 120.00, NOW(), NOW()),
(6, 18, 'Papaya', 4, 80.00, 320.00, NOW(), NOW()),
(7, 12, 'Carrot', 3, 90.00, 270.00, NOW(), NOW()),
(8, 8, 'Moong Dal', 1, 30.00, 30.00, NOW(), NOW()),
(9, 4, 'Green Chilli', 2, 18.00, 36.00, NOW(), NOW()),
(10, 6, 'Desi Ghee', 1, 16.00, 16.00, NOW(), NOW()),
(11, 3, 'Basmati Rice', 5, 90.00, 450.00, NOW(), NOW()),
(12, 9, 'Cabbage', 2, 100.00, 200.00, NOW(), NOW()),
(13, 11, 'Wheat Flour', 3, 70.00, 210.00, NOW(), NOW()),
(14, 14, 'Cow Milk', 2, 150.00, 300.00, NOW(), NOW()),
(15, 16, 'Chana Dal', 4, 250.00, 1000.00, NOW(), NOW()),
(16, 13, 'Banana', 2, 45.00, 90.00, NOW(), NOW()),
(17, 1, 'Organic Tomato', 5, 25.00, 125.00, NOW(), NOW()),
(18, 17, 'Broccoli', 1, 40.00, 40.00, NOW(), NOW()),
(19, 19, 'Brown Rice', 3, 50.00, 150.00, NOW(), NOW()),
(20, 20, 'Lady Finger', 2, 55.00, 110.00, NOW(), NOW());

COMMIT;

 * 
 */



// {
//     total_orderss: ,
//     orders: [
//         {
//             id,
//             user_id_fk,
//             ...otherdata,

//             ordered_items : [
//                 {
//                     ...data as per schema
//                 }
//             ]
//         }
//     ]
// }