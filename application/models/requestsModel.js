const db = require("../config/db.connect");

const requestsModel = {
    // Create a new request
    createRequest: (recipient_id, donation_id, food_category_id, status = "pending") => {
        let q = `
            INSERT INTO requests 
                (recipient_id, donation_id, food_category_id, status, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
        return db.query(q, [recipient_id, donation_id, food_category_id, status]);
    },

    // Get a request by its ID
    getRequestById: (request_id) => {
        let q = `
            SELECT * FROM requests WHERE id = ?
        `;
        return db.query(q, [request_id]);
    },

    // Get all requests
    getAllRequests: () => {
        let q = `
            SELECT 
                    r.id,
                    r.recipient_id, 
                    r.donation_id, 
                    r.food_category_id, 
                    r.status,
                    r.quantity,
                    r.createdAt, 
                    r.updatedAt, 
                    rc.name AS recipient_name,
                    rc.email,
                    rc.mobile,
                    rc.address,
                    d.quantity AS donation_quantity, 
                    fc.category_name AS food_category,
                    fc.id as food_category_id
            FROM requests r
                LEFT JOIN recipients rc ON r.recipient_id = rc.id
                LEFT JOIN donations d ON r.donation_id = d.id
                LEFT JOIN food_categories fc ON r.food_category_id = fc.id
        `;
        return db.query(q);
    },

    // Get pending requests
    getPendingRequests: () => {
        let q = `
            SELECT r.id, r.recipient_id, r.donation_id, r.food_category_id, 
                   r.status, r.createdAt, r.updatedAt, 
                   rc.name AS recipient_name, 
                   d.quantity AS donation_quantity, 
                   fc.category_name AS food_category
            FROM requests r
            LEFT JOIN recipients rc ON r.recipient_id = rc.id
            LEFT JOIN donations d ON r.donation_id = d.id
            LEFT JOIN food_categories fc ON r.food_category_id = fc.id
            WHERE r.status = 'pending'
        `;
        return db.query(q);
    },

    // Update request status
    updateRequestStatus: (request_id, status) => {
        let q = `
            UPDATE requests 
            SET status = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        return db.query(q, [status, request_id]);
    },

    // Delete a request
    deleteRequest: (request_id) => {
        let q = `
            DELETE FROM requests WHERE id = ?
        `;
        return db.query(q, [request_id]);
    },

    // Get requests by recipient
    getRequestsByRecipient: (recipient_id) => {
        let q = `
            SELECT r.id, r.donation_id, r.food_category_id, r.status, r.createdAt, r.updatedAt, 
                   d.quantity AS donation_quantity, 
                   fc.category_name AS food_category
            FROM requests r
            LEFT JOIN donations d ON r.donation_id = d.id
            LEFT JOIN food_categories fc ON r.food_category_id = fc.id
            WHERE r.recipient_id = ?
        `;
        return db.query(q, [recipient_id]);
    },

    // Get requests by donation
    getRequestsByDonation: (donation_id) => {
        let q = `
            SELECT r.id, r.recipient_id, r.food_category_id, r.status, r.createdAt, r.updatedAt, 
                   rc.name AS recipient_name, 
                   fc.category_name AS food_category
            FROM requests r
            LEFT JOIN recipients rc ON r.recipient_id = rc.id
            LEFT JOIN food_categories fc ON r.food_category_id = fc.id
            WHERE r.donation_id = ?
        `;
        return db.query(q, [donation_id]);
    }
};

module.exports = requestsModel;
