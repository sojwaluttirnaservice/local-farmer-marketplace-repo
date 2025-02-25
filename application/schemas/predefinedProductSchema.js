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

    image_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Name of the image file associated with the predefined product",
    },


    // INCASE THE IMAGE IS LOCATED AT THE OTHER SOURCE NOT ON SERVER
    image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "URL of the image associated with the predefined product",
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

    selling_price_per_unit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Selling Price per unit of the predefined product",
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


    stock_in_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Initial quantity of the product in stock",
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
