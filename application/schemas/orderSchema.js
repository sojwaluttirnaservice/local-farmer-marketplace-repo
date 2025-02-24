const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const userSchema = require("./userSchema");
const productSchema = require("./predefinedProductSchema");

// Order Schema
const orderSchema = sequelize.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each order",
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "User who placed the order",
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: productSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Product being ordered",
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Quantity of product ordered",
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Total price for the order",
    },
    order_status: {
        type: Sequelize.ENUM("Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"),
        defaultValue: "Pending",
        comment: "Current status of the order",
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
    tableName: "orders",
    comment: "Table storing order details",
});

module.exports = orderSchema