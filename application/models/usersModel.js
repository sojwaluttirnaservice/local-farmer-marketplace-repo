const db = require("../config/db.connect");

const usersModel = {

    // Add a new user
    add: (userData) => {
        let q = `
            INSERT INTO users (
                name,
                email,
                password,
                mobile,
                address,
                role,
                status,
                user_type,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertArray = [
            userData.name,
            userData.email,
            userData.password,
            userData.mobile || null,
            userData.address || null,
            userData.role || 'user', // Default role to 'user' if not provided
            userData.status || 'ACTIVE', // Default status to 'ACTIVE'
            userData.user_type || 'NORMAL', // Default user type to 'NORMAL'
            new Date(),
            new Date()
        ];

        return db.query(q, insertArray);
    },

    // Get user by email
    getUserByEmail: (email) => {
        let q = `SELECT * FROM users WHERE email = ?`;
        return db.query(q, [email]);
    },

    // Get user by ID
    getById: (userId) => {
        let q = `
            SELECT
                id,
                name,
                email,
                mobile,
                password,
                address,
                role,
                status,
                user_type,
                createdAt,
                updatedAt
            FROM users
            WHERE id = ?
        `;

        return db.query(q, [userId]);
    },

    // Update user details
    update: (userData) => {
        let q = `
            UPDATE users SET 
                name = ?,
                email = ?,
                mobile = ?,
                address = ?,
                role = ?,
                status = ?,
                user_type = ?,
                updatedAt = ?
            WHERE id = ?
        `;

        const updateArray = [
            userData.name,
            userData.email,
            userData.mobile || null,
            userData.address || null,
            userData.role || 'user',
            userData.status || 'ACTIVE',
            userData.user_type || 'NORMAL',
            new Date(),
            userData.id
        ];

        return db.query(q, updateArray);
    },

    // Delete a user by ID
    delete: (userId) => {
        let q = `DELETE FROM users WHERE id = ?`;
        return db.query(q, [userId]);
    },

    // List all users
    list: () => {
        let q = `
            SELECT 
                id,
                name,
                email,
                mobile,
                address,
                role,
                status,
                user_type,
                createdAt,
                updatedAt
            FROM users
            ORDER BY name ASC
        `;

        return db.query(q);
    },

    // Count total users
    count: () => {
        let q = `SELECT COUNT(*) AS total_users FROM users`;
        return db.query(q);
    }
};

module.exports = usersModel;
