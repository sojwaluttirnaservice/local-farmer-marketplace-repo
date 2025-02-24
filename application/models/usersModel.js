const db = require("../config/db.connect");

const usersModel = {

    // Add a new user
    add: (userData) => {
        let q = `
            INSERT INTO users (
                user_name,
                email,
                password,
                contact_number,
                address,
                role, 
                createdAt,
                updatedAt
            ) VALUES (?)
        `;

        const insertArray = [
            userData.user_name,
            userData.email,
            userData.password,
            userData.contact_number,
            userData.address,
            userData.role || 'user', // Default role to 'user' if not provided
            new Date(),
            new Date()
        ];

        return db.query(q, [insertArray]);
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
                user_name,
                email,
                contact_number,
                address,
                role,
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
                user_name = ?,
                email = ?,
                contact_number = ?,
                address = ?,
                role = ?,
                updatedAt = ?
            WHERE id = ?
        `;

        const updateArray = [
            userData.user_name,
            userData.email,
            userData.contact_number,
            userData.address,
            userData.role || 'user',
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
                user_name,
                email,
                contact_number,
                address,
                role,
                createdAt,
                updatedAt
            FROM users
            ORDER BY user_name ASC
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
