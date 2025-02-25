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
        let q = `

        SELECT 
                    f.id,
                    f.farmer_name,
                    f.email,
                    f.mobile,
                    f.address,
                    f.farm_name,
                    f.farm_location,
                    f.established_year,
                    f.farm_size,
                    SUM(fp.stock_quantity) AS products_sold
                FROM farmers AS f
                LEFT JOIN farmer_products AS fp
                    ON f.id = fp.farmer_id_fk
                
                WHERE f.id = ?
                GROUP BY 
                    f.id, 
                    f.farmer_name, 
                    f.email, 
                    f.mobile, 
                    f.address, 
                    f.farm_name, 
                    f.farm_location, 
                    f.established_year, 
                    f.farm_size
                ;
        `;
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
                    f.id,
                    f.farmer_name,
                    f.email,
                    f.mobile,
                    f.address,
                    f.farm_name,
                    f.farm_location,
                    f.established_year,
                    f.farm_size,
                    SUM(fp.stock_quantity) AS products_sold
                FROM farmers AS f
                LEFT JOIN farmer_products AS fp
                    ON f.id = fp.farmer_id_fk
                GROUP BY 
                    f.id, 
                    f.farmer_name, 
                    f.email, 
                    f.mobile, 
                    f.address, 
                    f.farm_name, 
                    f.farm_location, 
                    f.established_year, 
                    f.farm_size
                ORDER BY f.farmer_name ASC;`;
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
                    f.id,
                    f.farmer_name,
                    f.email,
                    f.mobile,
                    f.address,
                    f.farm_name,
                    f.farm_location,
                    f.established_year,
                    f.farm_size,
                    COALESCE(SUM(fp.stock_quantity), 0) AS products_sold
                FROM farmers AS f
                LEFT JOIN farmer_products AS fp
                    ON f.id = fp.farmer_id_fk
                GROUP BY 
                    f.id, 
                    f.farmer_name, 
                    f.email, 
                    f.mobile, 
                    f.address, 
                    f.farm_name, 
                    f.farm_location, 
                    f.established_year, 
                    f.farm_size
                ORDER BY f.farmer_name ASC;
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
