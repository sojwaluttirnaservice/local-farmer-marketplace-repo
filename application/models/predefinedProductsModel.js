const db = require("../config/db.connect");

const predefinedProductsModel = {
    // Add a new predefined product
    add: (productData) => {
        let q = `
            INSERT INTO predefined_products (
                product_name,
                description,
                price_per_unit,
                category,
                unit_of_measurement
            ) VALUES (?)
        `;

        const insertArray = [
            productData.product_name,
            productData.description || '',
            productData.price_per_unit,
            productData.category,
            productData.unit_of_measurement,
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
                category,
                unit_of_measurement,
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
                category,
                unit_of_measurement,
                createdAt,
                updatedAt
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
                category = ?,
                unit_of_measurement = ?
            WHERE id = ?
        `;

        const updateArray = [
            productData.product_name,
            productData.description || '',
            productData.price_per_unit,
            productData.category,
            productData.unit_of_measurement,
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

    // Get product count grouped by category (all predefined products)
    getProductCountByCategoryAll: () => {
        let q = `
            SELECT 
                category,
                COUNT(*) AS product_count
            FROM predefined_products
            GROUP BY category
            ORDER BY category ASC
        `;

        return db.query(q);
    }
};

module.exports = predefinedProductsModel;
