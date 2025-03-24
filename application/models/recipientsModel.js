const db = require("../config/db.connect");

const recipientsModel = {
    // Get all recipients
    getAllRecipients: () => {
        let q = `SELECT 
                    r.id, 
                    r.name, 
                    r.email, 
                    r.mobile, 
                    r.address, 
                    r.organization_name, 
                    r.createdAt, 
                    r.updatedAt
                 FROM recipients r
                 ORDER BY r.createdAt DESC`;

        return db.query(q);
    },

    // Get recipient by ID
    getRecipientById: (id) => {
        let q = `SELECT 
                    r.id, 
                    r.name, 
                    r.email, 
                    r.mobile, 
                    r.address, 
                    r.organization_name, 
                    r.createdAt, 
                    r.updatedAt
                 FROM recipients r
                 WHERE r.id = ?`;

        return db.query(q, [id]);
    },

    // Get recipient by email
    getRecipientByEmail: (email) => {
        let q = `SELECT 
                    r.id, 
                    r.name, 
                    r.email, 
                    r.mobile, 
                    r.address, 
                    r.organization_name, 
                    r.createdAt, 
                    r.updatedAt
                 FROM recipients r
                 WHERE r.email = ?`;

        return db.query(q, [email]);
    },

    // Create a new recipient
    createRecipient: (recipientData) => {
        let q = `INSERT INTO recipients (
                    name, email, password, mobile, address, organization_name, createdAt, updatedAt
                 ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

        let values = [
            recipientData.name,
            recipientData.email,
            recipientData.password,
            recipientData.mobile,
            recipientData.address,
            recipientData.organization_name || null
        ];

        return db.query(q, values);
    },

    // Update recipient details
    updateRecipient: (id, recipientData) => {
        let q = `UPDATE recipients SET 
                    name = ?, 
                    email = ?, 
                    mobile = ?, 
                    address = ?, 
                    organization_name = ?, 
                    updatedAt = CURRENT_TIMESTAMP 
                 WHERE id = ?`;

        let values = [
            recipientData.name,
            recipientData.email,
            recipientData.mobile,
            recipientData.address,
            recipientData.organization_name || null,
            id
        ];

        return db.query(q, values);
    },

    // Delete recipient
    deleteRecipient: (id) => {
        let q = `DELETE FROM recipients WHERE id = ?`;
        return db.query(q, [id]);
    }
};

module.exports = recipientsModel;
