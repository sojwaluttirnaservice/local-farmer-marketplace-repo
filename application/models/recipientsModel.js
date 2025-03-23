const db = require("../config/db.connect");

const recipientsModel = {

    getAllRecipients: () => {
        let q = `SELECT 
            id,
            name,
            email,
            mobile,
            address,
            organization_name,
            requirement,
            delivery_address,
            delivery_time,
            status,
            createdAt,
            updatedAt 
        FROM recipients`;

        return db.query(q)
    },

    getRecipientById: (id) => {
        let q = `SELECT 
                id,
                name,
                email,
                mobile,
                address,
                organization_name,
                requirement,
                delivery_address,
                delivery_time,
                status,
                createdAt,
                updatedAt 
            FROM recipients 
            WHERE id = ?`;
        return db.query(q, [id]);
    },

    getRecipientByEmail: (email) => {
        let q = `SELECT 
                id,
                name,
                email,
                mobile,
                address,
                organization_name,
                requirement,
                delivery_address,
                delivery_time,
                status,
                createdAt,
                updatedAt 
            FROM recipients 
            WHERE email = ?`;
        return db.query(q, [email]);
    },

    createRecipient: (recipientData) => {
        let q = `INSERT INTO recipients (
                name,
                email,
                password,
                mobile,
                address,
                organization_name,
                requirement,
                delivery_address,
                delivery_time,
                status,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        let values = [
            recipientData.name,
            recipientData.email,
            recipientData.password,
            recipientData.mobile,
            recipientData.address,
            recipientData.organization_name,
            recipientData.requirement,
            recipientData.delivery_address,
            recipientData.delivery_time,
            recipientData.status
        ];
        return db.query(q, values);
    },

    updateRecipient: (id, recipientData) => {
        let q = `UPDATE recipients SET 
                name = ?,
                email = ?,
                mobile = ?,
                address = ?,
                organization_name = ?,
                requirement = ?,
                delivery_address = ?,
                delivery_time = ?,
                status = ?,
                updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ?`;
        let values = [
            recipientData.name,
            recipientData.email,
            recipientData.mobile,
            recipientData.address,
            recipientData.organization_name,
            recipientData.requirement,
            recipientData.delivery_address,
            recipientData.delivery_time,
            recipientData.status,
            id
        ];
        return db.query(q, values);
    },

    deleteRecipient: (id) => {
        let q = `DELETE FROM recipients WHERE id = ?`;
        return db.query(q, [id]);
    }
};

module.exports = recipientsModel;