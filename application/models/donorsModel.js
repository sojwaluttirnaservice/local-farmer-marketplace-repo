const db = require("../config/db.connect");

const donorsModel = {

    // Add a new donor with food donation details
    addDonor: (
        name,
        email,
        password,
        mobile,
        address,
        food_type,
        quantity,
        expiry_date,
        pickup_address,
        pickup_time,
        status
    ) => {
        let q = `
            INSERT INTO donors 
                (
                    name, 
                    email, 
                    password, 
                    mobile, 
                    address, 
                    food_type, 
                    quantity, 
                    expiry_date, 
                    pickup_address, 
                    pickup_time, 
                    status
                ) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        return db.query(q, [
            name,
            email,
            password,
            mobile,
            address,
            food_type,
            quantity,
            expiry_date,
            pickup_address,
            pickup_time,
            status
        ]);
    },

    // Get donor by ID
    getDonorById: (donorId) => {
        let q = `
            SELECT 
                * 
            FROM 
                donors 
            WHERE 
                id = ?
        `;
        return db.query(q, [donorId]);
    },

    // Get all donors
    getAllDonors: () => {
        let q = `
            SELECT 
                * 
            FROM 
                donors
        `;
        return db.query(q);
    },

    // Update donor details (excluding password)
    updateDonor: (
        donorId,
        name,
        email,
        mobile,
        address,
        food_type,
        quantity,
        expiry_date,
        pickup_address,
        pickup_time,
        status
    ) => {
        let q = `
            UPDATE donors 
            SET 
                name = ?, 
                email = ?, 
                mobile = ?, 
                address = ?, 
                food_type = ?, 
                quantity = ?, 
                expiry_date = ?, 
                pickup_address = ?, 
                pickup_time = ?, 
                status = ?
            WHERE 
                id = ?
        `;
        return db.query(q, [
            name,
            email,
            mobile,
            address,
            food_type,
            quantity,
            expiry_date,
            pickup_address,
            pickup_time,
            status,
            donorId
        ]);
    },

    // Update donor password
    updateDonorPassword: (donorId, newPassword) => {
        let q = `
            UPDATE donors 
            SET 
                password = ? 
            WHERE 
                id = ?
        `;
        return db.query(q, [newPassword, donorId]);
    },

    // Delete donor
    deleteDonor: (donorId) => {
        let q = `
            DELETE FROM 
                donors 
            WHERE 
                id = ?
        `;
        return db.query(q, [donorId]);
    }
};

module.exports = donorsModel;
