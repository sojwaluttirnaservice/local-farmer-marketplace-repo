const db = require("../config/db.connect");

const donationsModel = {
    // Create a new donation
    createDonation: (donationData) => {

        let { donor_id, food_category_id, quantity, expiry_date, pickup_address, pickup_time, status } = donationData
        let q = `
            INSERT INTO donations 
                (
                    donor_id, 
                    food_category_id, 
                    quantity, 
                    expiry_date, 
                    pickup_address, 
                    pickup_time, 
                    status
                ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        return db.query(q, [donor_id, food_category_id, quantity, expiry_date, pickup_address, pickup_time, status || 'available']);
    },

    // Get donation by ID
    getDonationById: (donation_id) => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category,
                donors.name AS donor_name, 
                donors.mobile AS donor_contact 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            JOIN donors ON d.donor_id = donors.id
            WHERE d.id = ?
        `;
        return db.query(q, [donation_id]);
    },

    // Get all donations
    getAllDonations: () => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category,
                donors.name AS donor_name, 
                donors.mobile AS donor_contact 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            JOIN donors ON d.donor_id = donors.id
            ORDER BY d.quantity DESC
        `;
        return db.query(q);
    },


    getDonationsByFoodCategory: (food_category_id) => {
        let q = `
            SELECT 
                d.*,
                d.quantity, 
                fc.category_name AS food_category,
                donors.name AS donor_name, 
                donors.mobile AS donor_contact 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            JOIN donors ON d.donor_id = donors.id
            WHERE d.status = 'available ORDER BY d.quantity DESC'
        `;
        return db.query(q);
    },

    // Get available donations
    getAvailableDonations: () => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category,
                donors.name AS donor_name, 
                donors.mobile AS donor_contact 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            JOIN donors ON d.donor_id = donors.id
            WHERE d.status = 'available' 
            ORDER BY d.quantity DESC
        `;
        return db.query(q);
    },

    // Get donations by donor ID
    getDonationsByDonorId: (donor_id) => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            WHERE d.donor_id = ?
        `;
        return db.query(q, [donor_id]);
    },

    // Get donations by status
    getDonationsByStatus: (status) => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            WHERE d.status = ?
        `;
        return db.query(q, [status]);
    },

    // Get donations by address (pickup location)
    getDonationsByAddress: (pickup_address) => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            WHERE d.pickup_address LIKE ?
        `;
        return db.query(q, [`%${pickup_address}%`]);
    },

    // Get donations by food category
    getDonationsByFoodCategory: (food_category_id) => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            WHERE d.food_category_id = ?
        `;
        return db.query(q, [food_category_id]);
    },

    // Get donations sorted in ascending or descending order
    getDonationsSorted: (sortField = "createdAt", sortOrder = "ASC") => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            ORDER BY ${sortField} ${sortOrder}
        `;
        return db.query(q);
    },

    // Update donation quantity
    updateDonationQuantity: (donation_id, quantity) => {
        let q = `
            UPDATE donations 
            SET quantity = ?, 
                status = CASE WHEN ? = 0 THEN 'completed' ELSE status END 
            WHERE id = ?
        `;
        return db.query(q, [quantity, quantity, donation_id]);
    },


    // Update donation status
    updateDonationStatus: (donation_id, status) => {
        let q = `
            UPDATE donations 
            SET status = ? 
            WHERE id = ?
        `;
        return db.query(q, [status, donation_id]);
    },

    // Get donations with donor details & sorting options
    getDonationsWithDonorDetails: (sortField = "createdAt", sortOrder = "ASC") => {
        let q = `
            SELECT 
                d.*, 
                fc.category_name AS food_category,
                donors.name AS donor_name, 
                donors.mobile AS donor_contact 
            FROM donations d
            JOIN food_categories fc ON d.food_category_id = fc.id
            JOIN donors ON d.donor_id = donors.id
            ORDER BY ${sortField} ${sortOrder}
        `;
        return db.query(q);
    },

    // Get total donations count per donor
    getDonationsCountByDonor: (donor_id) => {
        let q = `
            SELECT COUNT(*) AS total_donations 
            FROM donations 
            WHERE donor_id = ?
        `;
        return db.query(q, [donor_id]);
    },

    // Delete a donation
    deleteDonation: (donation_id) => {
        let q = `
            DELETE FROM donations 
            WHERE id = ?
        `;
        return db.query(q, [donation_id]);
    }
};

module.exports = donationsModel;
