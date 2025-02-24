const Sequelize = require("sequelize");

const userSchema = require("./userSchema");
const orderSchema = require("./orderSchema");
const sequelize = require("../config/sequelize");

// Payment Schema
const paymentSchema = sequelize.define("payments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each payment",
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: orderSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Order associated with the payment",
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "User making the payment",
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Total payment amount",
    },
    payment_method: {
        type: Sequelize.ENUM("UPI", "Credit Card", "Debit Card", "Cash on Delivery"),
        allowNull: false,
        comment: "Payment method used",
    },
    payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed"),
        defaultValue: "Pending",
        comment: "Status of the payment",
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
    tableName: "payments",
    comment: "Table storing payment details",
});

module.exports = paymentSchema