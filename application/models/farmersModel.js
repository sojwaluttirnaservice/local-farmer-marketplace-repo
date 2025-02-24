const db = require("../config/db.connect");

const farmersModel = {

    // Add a new farmer
    add: (insertData) => {
        let q = `
            INSERT INTO farmers (
                farmer_name,
                email,
                password,
                mobile,
                address,
                farm_name,
                farm_location,
                established_year,
                farm_size
            ) VALUES (?)
        `;

        const insertArray = [
            insertData.farmer_name,
            insertData.email,
            insertData.password,
            insertData.mobile,  // updated field name
            insertData.address,
            insertData.farm_name,
            insertData.farm_location,
            insertData.established_year,
            insertData.farm_size
        ];

        return db.query(q, [insertArray]);
    },

    // Update farmer details
    update: (updateData) => {
        let q = `
            UPDATE farmers SET 
                farmer_name = ?,
                email = ?,
                mobile = ?,
                address = ?,
                farm_name = ?,
                farm_location = ?,
                established_year = ?,
                farm_size = ?
            WHERE id = ?
        `;

        const updateArray = [
            updateData.farmer_name,
            updateData.email,
            updateData.mobile,  // updated field name
            updateData.address,
            updateData.farm_name,
            updateData.farm_location,
            updateData.established_year,
            updateData.farm_size,
            updateData.id
        ];

        return db.query(q, updateArray);
    },

    // Update farmer's email based on ID
    updateEmail: (email, farmerId) => {
        let q = `UPDATE farmers SET email = ? WHERE id = ?`;
        return db.query(q, [email, farmerId]);
    },

    // Get farmer by ID
    getFarmerById: (id) => {
        let q = `SELECT * FROM farmers WHERE id = ?`;
        return db.query(q, [id]);
    },

    // Get farmer by email
    getFarmerByEmail: (email) => {
        let q = `SELECT * FROM farmers WHERE email = ?`;
        return db.query(q, [email]);
    },

    // Get farmer by mobile number
    getFarmerByMobile: (mobile) => {
        let q = `SELECT * FROM farmers WHERE mobile = ?`;
        return db.query(q, [mobile]);
    },

    // List all farmers
    list: () => {
        const q = `
            SELECT 
                id,
                farmer_name,
                email,
                mobile,
                address,
                farm_name,
                farm_location,
                established_year,
                farm_size
            FROM farmers
            ORDER BY farmer_name ASC
        `;
        return db.query(q);
    },

    // Count total farmers
    count: () => {
        let q = `SELECT COUNT(*) AS total_farmers FROM farmers`;
        return db.query(q);
    },

    // Get farmers with their added products
    getFarmersWithProducts: () => {
        let q = `
            SELECT 
                f.id AS farmer_id,
                f.farmer_name,
                f.email,
                f.mobile,
                f.farm_name,
                f.farm_location,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'farmer_product_id', fp.id,
                        'predefined_product_id', fp.predefined_product_id_fk,
                        'product_name', pp.product_name,
                        'category', pp.category,
                        'price_per_unit', pp.price_per_unit,
                        'stock_quantity', fp.stock_quantity,
                        'is_available', fp.is_available,
                        'harvest_date', fp.harvest_date,
                        'expiry_date', fp.expiry_date
                    )
                ) AS products
            FROM farmers AS f
            LEFT JOIN farmer_products AS fp ON f.id = fp.farmer_id_fk
            LEFT JOIN predefined_products AS pp ON fp.predefined_product_id_fk = pp.id
            GROUP BY f.id
            `;
            // ORDER BY f.farmer_name ASC
        return db.query(q);
    },

    // Delete a farmer by ID
    delete: (farmerId) => {
        let q = `DELETE FROM farmers WHERE id = ?`;
        return db.query(q, [farmerId]);
    }
};

module.exports = farmersModel;
