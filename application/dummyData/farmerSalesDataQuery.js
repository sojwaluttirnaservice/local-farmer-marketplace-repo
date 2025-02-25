/**
-- Purpose of the Query:
-- This query performs the following operations within a single transaction:
-- 1. Inserts 20 sale records into the `farmer_sales` table, representing products sold by farmers to the admin.
-- 2. For each sale, it updates the corresponding product's `stock_in_quantity` in the `predefined_products` table by adding the sold quantity.
-- 3. Ensures data consistency by committing all changes only if both the sale insertion and stock update succeed. If any step fails, the transaction rolls back, preventing partial updates.

START TRANSACTION;

-- 1. Insert 20 Sale Records into farmer_sales
-- Each record represents a farmer selling a specific quantity of a product.
-- Sale amount is calculated as: stock_quantity * price_per_unit_at_transaction.
-- Payment can be 'Pending', 'Completed', or 'Failed', and a unique transaction ID is recorded.

INSERT INTO farmer_sales (
    farmer_id_fk,               -- ID of the farmer making the sale
    predefined_product_id_fk,   -- ID of the predefined product being sold
    stock_quantity,             -- Quantity of the product sold
    price_per_unit_at_transaction, -- Price per unit at the time of sale
    sale_date,                  -- Date and time of the sale
    sale_amount,                -- Total sale amount (quantity * price_per_unit)
    payment_status,             -- Status of the payment (Pending, Completed)
    payment_method,             -- Payment method used (Cash, Bank Transfer, etc.)
    transaction_id,             -- Unique transaction ID for the sale
    createdAt,                  -- Timestamp when the sale record was created
    updatedAt                   -- Timestamp when the sale record was last updated
) VALUES
-- Example sales with various quantities, prices, and payment methods
(1, 10, 5, 2.00, NOW(), 10.00, 'Pending', 'Cash', 'TXN001', NOW(), NOW()),
(2, 11, 3, 1.50, NOW(), 4.50, 'Completed', 'Bank Transfer', 'TXN002', NOW(), NOW()),
(1, 12, 10, 3.00, NOW(), 30.00, 'Pending', 'Online Payment', 'TXN003', NOW(), NOW()),
(3, 13, 8, 2.50, NOW(), 20.00, 'Completed', 'Cash', 'TXN004', NOW(), NOW()),
(4, 14, 4, 2.00, NOW(), 8.00, 'Pending', 'Bank Transfer', 'TXN005', NOW(), NOW()),
(2, 15, 6, 3.00, NOW(), 18.00, 'Completed', 'Cash', 'TXN006', NOW(), NOW()),
(1, 16, 7, 2.20, NOW(), 15.40, 'Pending', 'Online Payment', 'TXN007', NOW(), NOW()),
(5, 17, 9, 1.80, NOW(), 16.20, 'Completed', 'Cash', 'TXN008', NOW(), NOW()),
(3, 18, 2, 2.50, NOW(), 5.00, 'Pending', 'Bank Transfer', 'TXN009', NOW(), NOW()),
(4, 19, 5, 2.00, NOW(), 10.00, 'Completed', 'Online Payment', 'TXN010', NOW(), NOW()),
(1, 20, 3, 2.50, NOW(), 7.50, 'Pending', 'Cash', 'TXN011', NOW(), NOW()),
(2, 21, 8, 1.20, NOW(), 9.60, 'Completed', 'Bank Transfer', 'TXN012', NOW(), NOW()),
(1, 22, 4, 3.00, NOW(), 12.00, 'Pending', 'Online Payment', 'TXN013', NOW(), NOW()),
(3, 23, 6, 2.00, NOW(), 12.00, 'Completed', 'Cash', 'TXN014', NOW(), NOW()),
(4, 24, 10, 1.50, NOW(), 15.00, 'Pending', 'Bank Transfer', 'TXN015', NOW(), NOW()),
(5, 25, 7, 2.50, NOW(), 17.50, 'Completed', 'Online Payment', 'TXN016', NOW(), NOW()),
(2, 26, 3, 2.00, NOW(), 6.00, 'Pending', 'Cash', 'TXN017', NOW(), NOW()),
(3, 27, 5, 1.80, NOW(), 9.00, 'Completed', 'Bank Transfer', 'TXN018', NOW(), NOW()),
(4, 28, 8, 2.20, NOW(), 17.60, 'Pending', 'Online Payment', 'TXN019', NOW(), NOW()),
(1, 29, 6, 2.50, NOW(), 15.00, 'Completed', 'Cash', 'TXN020', NOW(), NOW());

-- 2. Update Stock in predefined_products for Each Sale
-- After each sale, increase the stock in the predefined_products table.
-- This ensures that the inventory reflects the quantity sold by farmers to the admin.

UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 5 WHERE id = 10;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 3 WHERE id = 11;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 10 WHERE id = 12;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 8 WHERE id = 13;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 4 WHERE id = 14;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 6 WHERE id = 15;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 7 WHERE id = 16;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 9 WHERE id = 17;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 2 WHERE id = 18;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 5 WHERE id = 19;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 3 WHERE id = 20;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 8 WHERE id = 21;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 4 WHERE id = 22;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 6 WHERE id = 23;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 10 WHERE id = 24;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 7 WHERE id = 25;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 3 WHERE id = 26;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 5 WHERE id = 27;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 8 WHERE id = 28;
UPDATE predefined_products SET stock_in_quantity = stock_in_quantity + 6 WHERE id = 29;

-- 3. Commit the Transaction
-- If all INSERT and UPDATE operations succeed, commit the transaction to make changes permanent.
-- If any error occurs during the process, the transaction will be rolled back, preventing partial updates.

COMMIT;


*/