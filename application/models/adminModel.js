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
    }
};

module.exports = adminModel;
