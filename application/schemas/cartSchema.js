const Sequelize = require("sequelize");

const sequelize = require("../config/sequelize");
const userSchema = require("./userSchema");
const predefinedProductSchema = require("./predefinedProductSchema");

// Cart Schema
const cartSchema = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each cart item",
    },

    user_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "User who owns the cart",
    },

    predefined_product_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: predefinedProductSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Product added to the cart",
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Quantity added to the cart",
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