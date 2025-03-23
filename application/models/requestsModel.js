const db = require("../config/db.connect");

const requestsModel = {

    createRequest: (recipient_id, food_type, quantity, status, delivery_address, delivery_time) => {
        let q = `
            INSERT INTO requests 
                (recipient_id, 
                food_type, 
                quantity, 
                status, 
                delivery_address, 
                delivery_time) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return db.query(q, [recipient_id, food_type, quantity, status, delivery_address, delivery_time]);
    },

    getRequestById: (request_id) => {
        let q = `
            SELECT * 
            FROM requests 
            WHERE id = ?
        `;
        return db.query(q, [request_id]);
    },

    getAllRequests: () => {
        let q = `
            SELECT * 
            FROM requests
        `;
        return db.query(q);
    },

    getPendingRequests: () => {
        let q = `
            SELECT * 
            FROM requests 
            WHERE status = 'PENDING'
        `;
        return db.query(q);
    },

    updateRequestStatus: (request_id, status) => {
        let q = `
            UPDATE requests 
            SET status = ? 
            WHERE id = ?
        `;
        return db.query(q, [status, request_id]);
    },

    deleteRequest: (request_id) => {
        let q = `
            DELETE FROM requests 
            WHERE id = ?
        `;
        return db.query(q, [request_id]);
    }
};

module.exports = requestsModel;
