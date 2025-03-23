const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const donationSchema = sequelize.define("donations", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique donation ID",
    },
    donor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "donors", key: "id" }, // Updated reference
        onDelete: "CASCADE",
        comment: "Foreign key linking to donors",
    },
    food_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Type of food being donated",
    },
    quantity: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "Quantity of food donated",
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "Expiration date of the donated food",
    },
    status: {
        type: Sequelize.ENUM("available", "assigned", "completed", "expired"),
        allowNull: false,
        defaultValue: "available",
        comment: "Status of the donation",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Donation created timestamp",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Donation updated timestamp",
    },
}, {
    timestamps: true,
    tableName: "donations",
    comment: "Stores donation details",
});

module.exports = donationSchema;
