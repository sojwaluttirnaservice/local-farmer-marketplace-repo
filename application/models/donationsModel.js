const db = require("../config/db.connect");

const donationsModel = {

    createDonation: (donor_id, food_type, quantity, expiry_date, status) => {
        let q = `
            INSERT INTO donations 
                (donor_id, 
                food_type, 
                quantity, 
                expiry_date, 
                status) 
            VALUES (?, ?, ?, ?, ?)
        `;
        return db.query(q, [donor_id, food_type, quantity, expiry_date, status]);
    },

    getDonationById: (donation_id) => {
        let q = `
            SELECT * 
            FROM donations 
            WHERE id = ?
        `;
        return db.query(q, [donation_id]);
    },

    getAllDonations: () => {
        let q = `
            SELECT * 
            FROM donations
        `;
        return db.query(q);
    },

    getAvailableDonations: () => {
        let q = `
            SELECT * 
            FROM donations 
            WHERE status = 'available'
        `;
        return db.query(q);
    },

    updateDonationStatus: (donation_id, status) => {
        let q = `
            UPDATE donations 
            SET status = ? 
            WHERE id = ?
        `;
        return db.query(q, [status, donation_id]);
    },

    deleteDonation: (donation_id) => {
        let q = `
            DELETE FROM donations 
            WHERE id = ?
        `;
        return db.query(q, [donation_id]);
    }
};

module.exports = donationsModel;
