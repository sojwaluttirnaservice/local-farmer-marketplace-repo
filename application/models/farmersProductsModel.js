const db = require("../config/db.connect");

const farmersProductsModel = {
    // Add a new product entry for a farmer
    add: (productData) => {
        let q = `
            INSERT INTO farmer_products (
                farmer_id_fk,
                predefined_product_id_fk,
                stock_quantity,
                is_available,
                harvest_date,
                expiry_date,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const params = [
            productData.farmer_id_fk,
            productData.predefined_product_id_fk,
            productData.stock_quantity,
            productData.is_available ?? true,
            productData.harvest_date || null,
            productData.expiry_date || null
        ];

        return db.query(q, params);
    },

    // Get a farmer product entry by its ID
    getById: (id) => {
        let q = `
            SELECT 
                fp.*,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_products fp
            INNER JOIN farmers f ON fp.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fp.predefined_product_id_fk = pp.id
            WHERE fp.id = ?
        `;
        return db.query(q, [id]);
    },

    // List all farmer product entries along with related farmer and predefined product info
    list: () => {
        let q = `
            SELECT 
                fp.id,
                fp.farmer_id_fk,
                fp.predefined_product_id_fk,
                fp.stock_quantity,
                fp.is_available,
                fp.harvest_date,
                fp.expiry_date,
                fp.createdAt,
                fp.updatedAt,
                f.farmer_name,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_products fp
            INNER JOIN farmers f ON fp.farmer_id_fk = f.id
            INNER JOIN predefined_products pp ON fp.predefined_product_id_fk = pp.id
            ORDER BY fp.createdAt DESC
        `;
        return db.query(q);
    },

    // Update a farmer product entry (for example, when stock or dates change)
    update: (productData) => {
        let q = `
            UPDATE farmer_products SET 
                stock_quantity = ?,
                is_available = ?,
                harvest_date = ?,
                expiry_date = ?,
                updatedAt = NOW()
            WHERE id = ?
        `;
        const params = [
            productData.stock_quantity,
            productData.is_available ?? true,
            productData.harvest_date || null,
            productData.expiry_date || null,
            productData.id
        ];
        return db.query(q, params);
    },

    // Delete a farmer product entry by its ID
    delete: (id) => {
        let q = `DELETE FROM farmer_products WHERE id = ?`;
        return db.query(q, [id]);
    },

    // Get all product entries for a specific farmer
    getByFarmerId: (farmerId) => {
        let q = `
            SELECT 
                fp.id,
                fp.farmer_id_fk,
                fp.predefined_product_id_fk,
                fp.stock_quantity,
                fp.is_available,
                fp.harvest_date,
                fp.expiry_date,
                fp.createdAt,
                fp.updatedAt,
                pp.product_name,
                pp.category,
                pp.price_per_unit,
                pp.unit_of_measurement
            FROM farmer_products fp
            INNER JOIN predefined_products pp ON fp.predefined_product_id_fk = pp.id
            WHERE fp.farmer_id_fk = ?
            ORDER BY fp.createdAt DESC
        `;
        return db.query(q, [farmerId]);
    },

    // Count total entries in the farmer_products table
    count: () => {
        let q = `SELECT COUNT(*) AS total_farmer_products FROM farmer_products`;
        return db.query(q);
    },


    getProductCountByCategoryAll: () => {
        let q = `
            SELECT 
                pp.category,
                COUNT(fp.id) AS product_count
            FROM predefined_products pp
            INNER JOIN farmer_products fp ON pp.id = fp.predefined_product_id_fk
            GROUP BY pp.category
            ORDER BY pp.category ASC
        `;
        return db.query(q);
    }
    
};

module.exports = farmersProductsModel;
