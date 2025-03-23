const db = require("../config/db.connect");

const distributionsModel = {

    createDistribution: (request_id, assigned_to, delivery_status, delivered_at) => {
        let q = `
            INSERT INTO distributions 
                (request_id, 
                assigned_to, 
                delivery_status, 
                delivered_at) 
            VALUES (?, ?, ?, ?)
        `;
        return db.query(q, [request_id, assigned_to, delivery_status, delivered_at]);
    },

    getDistributionById: (distribution_id) => {
        let q = `
            SELECT * 
            FROM distributions 
            WHERE id = ?
        `;
        return db.query(q, [distribution_id]);
    },

    getAllDistributions: () => {
        let q = `
            SELECT * 
            FROM distributions
        `;
        return db.query(q);
    },

    getPendingDistributions: () => {
        let q = `
            SELECT * 
            FROM distributions 
            WHERE delivery_status = 'pending'
        `;
        return db.query(q);
    },

    updateDistributionStatus: (distribution_id, delivery_status, delivered_at) => {
        let q = `
            UPDATE distributions 
            SET delivery_status = ?, 
                delivered_at = ? 
            WHERE id = ?
        `;
        return db.query(q, [delivery_status, delivered_at, distribution_id]);
    },

    deleteDistribution: (distribution_id) => {
        let q = `
            DELETE FROM distributions 
            WHERE id = ?
        `;
        return db.query(q, [distribution_id]);
    }
};

module.exports = distributionsModel;
