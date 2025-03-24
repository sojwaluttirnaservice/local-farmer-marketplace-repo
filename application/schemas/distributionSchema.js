const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const distributionSchema = sequelize.define("distributions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique distribution ID",
    },
    request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "requests", key: "id" },
        onDelete: "CASCADE",
        comment: "Foreign key linking to requests",
    },
    donation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "donations", key: "id" },
        onDelete: "CASCADE",
        comment: "Foreign key linking to the donation used in this distribution",
    },
    food_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "food_categories", key: "id" },
        onDelete: "CASCADE",
        comment: "Food category being distributed",
    },
    assigned_to: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Delivery person assigned (if any)",
    },
    delivery_status: {
        type: Sequelize.ENUM("pending", "on_the_way", "delivered"),
        allowNull: false,
        defaultValue: "pending",
        comment: "Current status of delivery",
    },
    delivered_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Timestamp when delivery was completed",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Distribution record creation timestamp",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Distribution record update timestamp",
    },
}, {
    timestamps: true,
    tableName: "distributions",
    comment: "Tracks distribution of food to recipients",
    indexes: [
        { fields: ["request_id"] },
        { fields: ["donation_id"] },
        { fields: ["food_category_id"] }, // Index for efficient filtering
    ],
});

module.exports = distributionSchema;
