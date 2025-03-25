const db = require("../config/db.connect");

const adminModel = {
    // Get admin by username
    getAdminByEmail: (email) => {
        let q = `SELECT * FROM admins WHERE email = ?`;
        return db.query(q, [email]);
    },



    // Get admin by ID
    getAdminById: (adminId) => {
        let q = `SELECT * FROM admins WHERE id = ?`;
        return db.query(q, [adminId]);
    },

    // Create a new admin
    createAdmin: (username, password, email) => {
        let q = `INSERT INTO admins (username, password, email) VALUES (?, ?, ?)`;
        return db.query(q, [username, password, email]);
    },

    // Update admin details
    updateAdmin: (adminId, username, email) => {
        let q = `UPDATE admins SET username = ?, email = ? WHERE id = ?`;
        return db.query(q, [username, email, adminId]);
    },

    // Update admin password
    updateAdminPassword: (adminId, password) => {
        let q = `UPDATE admins SET password = ? WHERE id = ?`;
        return db.query(q, [password, adminId]);
    },

    // Delete an admin
    deleteAdmin: (adminId) => {
        let q = `DELETE FROM admins WHERE id = ?`;
        return db.query(q, [adminId]);
    },

    // Get all admins
    getAllAdmins: () => {
        let q = `SELECT * FROM admins`;
        return db.query(q);
    },

    stats: () => {
        let q = `SELECT 
        (SELECT COUNT(*) FROM donors) AS total_donors,
        (SELECT COUNT(*) FROM recipients) AS total_recipients,
        (SELECT COUNT(*) FROM donations) AS total_donations,
        (SELECT COUNT(*) FROM donations WHERE status = 'available') AS available_donations,
        (SELECT COUNT(*) FROM donations WHERE status = 'assigned') AS assigned_donations,
        (SELECT COUNT(*) FROM donations WHERE status = 'completed') AS completed_donations,
        (SELECT COUNT(*) FROM donations WHERE status = 'expired') AS expired_donations,
        (SELECT COUNT(*) FROM requests) AS total_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'pending') AS pending_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'approved') AS approved_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'rejected') AS rejected_requests;
        `

        return db.query(q)
    },

    mostDonatedFoods: () => {
        let q = `SELECT 
                fc.category_name, 
                COUNT(d.id) AS donation_count  
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            GROUP BY fc.category_name  
            ORDER BY donation_count DESC  
            LIMIT 5;`


        return db.query(q)
    }
};

module.exports = adminModel;
