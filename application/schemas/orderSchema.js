const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const userSchema = require("./userSchema");

// Order Schema
const orderSchema = sequelize.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each order",
    },

    user_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the user who placed the order",
    },

    payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed", "Refunded"),
        defaultValue: "Pending",
        allowNull: false,
        comment: "Payment status for the order",
    },

    delivery_status: {
        type: Sequelize.ENUM("Not Dispatched", "Out for Delivery", "Delivered"),
        defaultValue: "Not Dispatched",
        allowNull: false,
        comment: "Tracking the delivery progress of the order",
    },

    payment_mode: {
        type: Sequelize.ENUM('ONLINE', 'CASH'),
        allowNull: false,
        comment: "Payment method used by the user",
    },

    payment_transaction_number: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Transaction number for the online payment",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the order was created",
    },
    
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the order was last updated",
    },
}, {
    timestamps: true,
    tableName: "orders",
    comment: "Table storing user order details",
});

module.exports = orderSchema;
