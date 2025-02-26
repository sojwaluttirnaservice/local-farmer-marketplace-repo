const db = require("../config/db.connect");

const predefinedProductsModel = {
    // Add a new predefined product
    add: (productData) => {
        let q = `
            INSERT INTO predefined_products (

                product_name,
                description,
                price_per_unit,
                selling_price_per_unit,

                category,
                unit_of_measurement,
                stock_in_quantity,
                image_name
                
            ) VALUES (?)
        `;

        const insertArray = [
            productData.product_name,
            productData.description || '',
            productData.price_per_unit,
            productData.selling_price_per_unit,
            productData.category,
            productData.unit_of_measurement,
            productData.stock_in_quantity || 0,
            productData.image_name || ''
        ];

        return db.query(q, [insertArray]);
    },

    // Get a predefined product by ID
    getById: (productId) => {
        let q = `
            SELECT 
                id,
                product_name,
                description,
                price_per_unit,
                selling_price_per_unit,
                stock_in_quantity,
                category,
                unit_of_measurement,
                image_name,
                createdAt,
                updatedAt
            FROM predefined_products
            WHERE id = ?
        `;

        return db.query(q, [productId]);
    },

    // List all predefined products
    list: () => {
        let q = `
            SELECT 
                id,
                product_name,
                description,
                price_per_unit,
                selling_price_per_unit,
                category,
                unit_of_measurement,
                stock_in_quantity,
                image_name,
                createdAt,
                updatedAt,
                DATE_FORMAT(createdAt, '%d-%m-%Y') AS _createdAt,
                DATE_FORMAT(updatedAt, '%d-%m-%Y') AS _updatedAt
            FROM predefined_products
            ORDER BY product_name ASC
        `;

        return db.query(q);
    },

    // Update a predefined product's details
    update: (productData) => {
        let q = `
            UPDATE predefined_products SET 
                product_name = ?,
                description = ?,
                price_per_unit = ?,
                selling_price_per_unit ?,
                category = ?,
                unit_of_measurement = ?,
                stock_in_quantity = ?,
                image_name = ?
            WHERE id = ?
        `;

        const updateArray = [
            productData.product_name,
            productData.description || '',
            productData.price_per_unit,
            productData.selling_price_per_unit,
            productData.category,
            productData.unit_of_measurement,
            productData.stock_in_quantity,
            productData.image_name,
            productData.id
        ];

        return db.query(q, updateArray);
    },

    // Delete a predefined product by ID
    delete: (productId) => {
        let q = `DELETE FROM predefined_products WHERE id = ?`;
        return db.query(q, [productId]);
    },

    // Count total predefined products
    count: () => {
        let q = `SELECT COUNT(*) AS total_products FROM predefined_products`;
        return db.query(q);
    },


    totalStockCount: () => {
        let q = `SELECT SUM(stock_in_quantity) AS total_stock from predefined_products`;
        return db.query(q)
    },

    // Get product count grouped by category (all predefined products)
    getProductCountByCategoryAll: () => {
        let q = `
            SELECT 
                category,
                SUM(stock_in_quantity) AS total_category_stock,
                COUNT(*) AS product_count
            FROM predefined_products
            GROUP BY category
            ORDER BY category ASC`;

        return db.query(q);
    },

    getProductsByStockCount: (params = {}) => {
        let { limit = 0, isDesc = true } = params;
        let order = isDesc ? "DESC" : "ASC";
        let q = `
            SELECT 
                id,
                product_name,
                description,
                price_per_unit,
                selling_price_per_unit,
                category,
                unit_of_measurement,
                stock_in_quantity,
                image_name,
                createdAt,
                updatedAt,
                DATE_FORMAT(createdAt, '%d-%m-%Y') AS _createdAt,
                DATE_FORMAT(updatedAt, '%d-%m-%Y') AS _updatedAt
            FROM predefined_products
            ORDER BY stock_in_quantity  ${order} ${limit > 0 ? `limit ${limit}` : ''}
        `;

        return db.query(q)
    }
};

module.exports = predefinedProductsModel;
