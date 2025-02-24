const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const predefinedProductSchema = sequelize.define("predefined_products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each predefined product",
    },

    product_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Name of the predefined product (e.g., Tomato, Potato, etc.)",
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Detailed description of the predefined product",
    },

    price_per_unit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Price per unit of the predefined product",
    },

    category: {
        type: Sequelize.ENUM("Vegetables", "Fruits", "Grains", "Dairy", "Spices", "Pulses", "Others"),
        allowNull: false,
        comment: "Category under which the product falls",
    },

    unit_of_measurement: {
        type: Sequelize.ENUM("Kilogram", "Gram", "Dozen", "Liter", "Piece", "Quintal"),
        allowNull: false,
        comment: "Unit of measurement for the product (e.g., kg, g, dozen, etc.)",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the predefined product record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the predefined product record was last updated",
    },
}, {
    timestamps: true,
    tableName: "predefined_products",
    comment: "Table storing predefined product details",
});

module.exports = predefinedProductSchema;
