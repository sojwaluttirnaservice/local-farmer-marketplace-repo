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
        references: { model: "donors", key: "id" },
        onDelete: "CASCADE",
        comment: "Foreign key linking to donors",
    },
    food_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "food_categories", key: "id" },
        onDelete: "CASCADE",
        comment: "Foreign key linking to standardized food category",
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Quantity of food donated (in kg/units)",
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "Expiration date of the donated food",
    },
    pickup_address: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: "Address for food pickup",
    },
    pickup_time: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Preferred food pickup time",
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
