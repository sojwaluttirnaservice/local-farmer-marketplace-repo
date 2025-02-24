const Sequelize = require("sequelize");

const sequelize = require("../config/sequelize");
const userSchema = require("./userSchema");
const productSchema = require("./predefinedProductSchema");

// Cart Schema
const cartSchema = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each cart item",
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "User who owns the cart",
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: productSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Product added to the cart",
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Quantity added to the cart",
    },
    unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Price per unit at the time of addition",
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Total price for the cart item",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
}, {
    timestamps: true,
    tableName: "cart",
    comment: "Table storing cart details",
});


module.exports = cartSchema;