const db = require("../config/db.connect");

const donorsModel = {
    // Add a new donor
    addDonor: ({ name, email, password, mobile, address }) => {
        let q = `INSERT INTO donors (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)`;
        return db.query(q, [name, email, password, mobile, address]);
    },

    getByEmail: (email) => {
        return db.query(`SELECT * from donors WHERE email = ?`, [email])
    },

    // Get donor by ID with donation details
    getDonorById: (donorId) => {
        let q = `
            SELECT 
                d.id AS donor_id,
                d.name,
                d.email,
                d.mobile,
                d.address,
                COUNT(dn.id) AS total_donations,
                GROUP_CONCAT(fc.category_name SEPARATOR ', ') AS food_categories,
                GROUP_CONCAT(dn.quantity SEPARATOR ', ') AS quantities,
                GROUP_CONCAT(dn.pickup_address SEPARATOR ' | ') AS pickup_addresses,
                GROUP_CONCAT(dn.status SEPARATOR ', ') AS statuses
            FROM donors d
            LEFT JOIN donations dn ON d.id = dn.donor_id
            LEFT JOIN food_categories fc ON dn.food_category_id = fc.id
            WHERE d.id = ?
            GROUP BY d.id
        `;
        return db.query(q, [donorId]);
    },

    // Get all donors with donation count and latest donation details
    getAllDonors: () => {
        let q = `
            SELECT 
                d.id AS donor_id,
                d.name,
                d.email,
                d.mobile,
                d.address,
                COUNT(dn.id) AS total_donations,
                MAX(DATE_FORMAT(dn.createdAt, "%d %b %Y")) AS last_donation_date,
                (SELECT fc.category_name FROM donations dn2 JOIN food_categories fc ON dn2.food_category_id = fc.id WHERE dn2.donor_id = d.id ORDER BY dn2.createdAt DESC LIMIT 1) AS last_food_category,
                (SELECT quantity FROM donations WHERE donor_id = d.id ORDER BY createdAt DESC LIMIT 1) AS last_quantity,
                (SELECT pickup_address FROM donations WHERE donor_id = d.id ORDER BY createdAt DESC LIMIT 1) AS last_pickup_address,
                (SELECT status FROM donations WHERE donor_id = d.id ORDER BY createdAt DESC LIMIT 1) AS last_status
            FROM donors d
            LEFT JOIN donations dn ON d.id = dn.donor_id
            GROUP BY d.id
            ORDER BY d.id DESC
        `;
        return db.query(q);
    },

    // Update donor details (excluding password)
    updateDonor: (donorId, name, email, mobile, address) => {
        let q = `
            UPDATE donors 
            SET 
                name = ?, 
                email = ?, 
                mobile = ?, 
                address = ?
            WHERE 
                id = ?
        `;
        return db.query(q, [name, email, mobile, address, donorId]);
    },

    // Update donor password
    updateDonorPassword: (donorId, newPassword) => {
        let q = `UPDATE donors SET password = ? WHERE id = ?`;
        return db.query(q, [newPassword, donorId]);
    },

    // Delete donor
    deleteDonor: (donorId) => {
        let q = `DELETE FROM donors WHERE id = ?`;
        return db.query(q, [donorId]);
    }
};

module.exports = donorsModel;
