let db = require("../config/db.connect");

const farmerSalesModel = {

    // Add a new sale record for a farmer
    add: async (saleData) => {
        // console.log("Sale Data Received:", saleData);

        try {
            // Start transaction
            await db.beginTransaction;

            // 1. Insert Sale Record
            let saleQuery = `
            INSERT INTO farmer_sales (
                farmer_id_fk,
                predefined_product_id_fk,
                stock_quantity,
                price_per_unit_at_transaction,
                sale_date,
                sale_amount,
                payment_status,
                payment_method,
                transaction_id,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

            const saleParams = [
                saleData.farmer_id_fk,
                saleData.predefined_product_id_fk,
                saleData.stock_quantity,
                saleData.price_per_unit_at_transaction,
                saleData.sale_date || new Date(),
                saleData.sale_amount,
                saleData.payment_status || "Pending",
                saleData.payment_method || null,
                saleData.transaction_id || null
            ];

            // Execute sale insertion query
            const [saleResult] = await db.query(saleQuery, saleParams);
            // console.log("Sale Insert Result:", saleResult);

            if (!saleResult.insertId) {
                throw new Error("Failed to add sale record.");
            }

            // 2. Fetch Current Stock for the Product
            const [fetchResult] = await db.query(
                `SELECT stock_in_quantity FROM predefined_products WHERE id = ?`,
                [saleData.predefined_product_id_fk]
            );

            if (!fetchResult[0]) {
                throw new Error("Product not found for stock update.");
            }

            const currentStock = +fetchResult[0]?.stock_in_quantity;
            const newStock = currentStock + +saleData.stock_quantity;

            // console.log(`Current Stock: ${currentStock}, New Stock: ${newStock}`);

            // 3. Update Stock Quantity
            const stockUpdateQuery = `
            UPDATE predefined_products 
            SET stock_in_quantity = ?
            WHERE id = ?
        `;

            const stockUpdateParams = [newStock, saleData.predefined_product_id_fk];
            // console.log("Stock Update Params:", stockUpdateParams);

            const [updateResult] = await db.query(stockUpdateQuery, stockUpdateParams);
            // console.log("Stock Update Result:", updateResult);

            if (updateResult.affectedRows === 0) {
                throw new Error("Failed to update stock quantity.");
            }

            // 4. Commit Transaction
            await db.commit;
            console.log("Transaction committed successfully.");

            // 5. Fetch Updated Product Stock for Verification
            const [_fetch] = await db.query(
                `SELECT * FROM predefined_products WHERE id = ?`,
                [saleData.predefined_product_id_fk]
            );

            // console.log("Updated Product Details:", _fetch);

            return [updateResult];
        } catch (err) {
            // Rollback transaction in case of error
            await db.rollback;
            console.error("Transaction failed:", err);
            throw err;
        } finally {
            // Optional: Release the connection if using manual connection handling
            // db.release();
            console.log("Transaction completed.");
        }
    },


    // Get a sale record by its ID
    getById: (id) => {
        let q = `
            SELECT 
                fs.*,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN farmers f ON fs.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            WHERE fs.id = ?
        `;
        return db.query(q, [id]);
    },

    // List all sale records with related farmer and predefined product info
    list: () => {
        let q = `
            SELECT 
                fs.id,
                fs.farmer_id_fk,
                fs.predefined_product_id_fk,
                fs.stock_quantity,
                fs.price_per_unit_at_transaction,
                fs.sale_date,
                fs.sale_amount,
                fs.payment_status,
                fs.payment_method,
                fs.transaction_id,
                fs.createdAt,
                fs.updatedAt,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN farmers f ON fs.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            ORDER BY fs.createdAt DESC;
        `;
        return db.query(q);
    },

    // Update a sale record (e.g., updating payment status or sale details)
    update: (saleData) => {
        let q = `
            UPDATE farmer_sales SET 
                stock_quantity = ?,
                price_per_unit_at_transaction = ?,
                sale_date = ?,
                sale_amount = ?,
                payment_status = ?,
                payment_method = ?,
                transaction_id = ?,
                updatedAt = NOW()
            WHERE id = ?
        `;
        const params = [
            saleData.stock_quantity,
            saleData.price_per_unit_at_transaction,
            saleData.sale_date || null,
            saleData.sale_amount,
            saleData.payment_status || "Pending",
            saleData.payment_method || null,
            saleData.transaction_id || null,
            saleData.id
        ];
        return db.query(q, params);
    },

    // Delete a sale record by its ID
    delete: (id) => {
        let q = `DELETE FROM farmer_sales WHERE id = ?`;
        return db.query(q, [id]);
    },

    // Get all sale records for a specific farmer
    getByFarmerId: (farmerId) => {
        let q = `
            SELECT 
                fs.id,
                fs.farmer_id_fk,
                fs.predefined_product_id_fk,
                fs.stock_quantity,
                fs.price_per_unit_at_transaction,
                fs.sale_date,
                fs.sale_amount,
                fs.payment_status,
                fs.payment_method,
                fs.transaction_id,
                fs.createdAt,
                fs.updatedAt,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            WHERE fs.farmer_id_fk = ?
            ORDER BY fs.createdAt DESC
        `;
        return db.query(q, [farmerId]);
    },

    // Count total sale records in the farmer_sales table
    count: () => {
        let q = `SELECT COUNT(*) AS total_farmer_sales FROM farmer_sales`;
        return db.query(q);
    },

    // Get sales count and total sales amount by product category
    getSalesCountByCategory: () => {
        let q = `
            SELECT 
                pp.category,
                COUNT(fs.id) AS sale_count,
                SUM(fs.sale_amount) AS total_sales_amount
            FROM predefined_products pp
            INNER JOIN farmer_sales fs ON pp.id = fs.predefined_product_id_fk
            GROUP BY pp.category
            ORDER BY pp.category ASC
        `;
        return db.query(q);
    },

    // Get sale records filtered by a specific product category
    getSalesByCategory: (category) => {
        let q = `
            SELECT 
                fs.id,
                fs.farmer_id_fk,
                fs.predefined_product_id_fk,
                fs.stock_quantity,
                fs.price_per_unit_at_transaction,
                fs.sale_date,
                fs.sale_amount,
                fs.payment_status,
                fs.payment_method,
                fs.transaction_id,
                fs.createdAt,
                fs.updatedAt,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            WHERE pp.category = ?
            ORDER BY fs.createdAt DESC
        `;
        return db.query(q, [category]);
    },

    // Get sales history ordered by sale_date in ascending or descending order
    getSalesHistory: (order = 'DESC') => {
        let q = `
            SELECT 
                fs.id,
                fs.farmer_id_fk,
                fs.predefined_product_id_fk,
                fs.stock_quantity,
                fs.price_per_unit_at_transaction,
                fs.sale_date,
                fs.sale_amount,
                fs.payment_status,
                fs.payment_method,
                fs.transaction_id,
                fs.createdAt,
                fs.updatedAt,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN farmers f ON fs.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            ORDER BY fs.sale_date ${order}
        `;
        return db.query(q);
    },


    // Get sales history ordered by sale_date in ascending or descending order
    getFarmerSalesHistory: (farmerId, order = 'DESC') => {
        let q = `
            SELECT 
                fs.id,
                fs.farmer_id_fk,
                fs.predefined_product_id_fk,
                fs.stock_quantity,
                fs.price_per_unit_at_transaction,
                fs.sale_date,
                DATE_FORMAT(fs.sale_date, "%e %b %Y") AS _sale_date,
                fs.sale_amount,
                fs.payment_status,
                fs.payment_method,
                fs.transaction_id,
                fs.createdAt,
                fs.updatedAt,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_sales fs
            INNER JOIN farmers f ON fs.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fs.predefined_product_id_fk = pp.id
            WHERE fs.farmer_id_fk = ?
            ORDER BY fs.sale_date ${order}
        `;
        return db.query(q, [farmerId]);
    }
};

module.exports = farmerSalesModel;
