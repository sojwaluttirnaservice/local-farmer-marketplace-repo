const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const farmerSchema = require("./farmerSchema");
const predefinedProductSchema = require("./predefinedProductSchema");

const farmerSalesSchema = sequelize.define("farmer_sales", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each sale record",
    },

    farmer_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: farmerSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the farmer making the sale",
    },

    predefined_product_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: predefinedProductSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the predefined product sold",
    },

    stock_quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Quantity of the product sold in the transaction",
    },

    price_per_unit_at_transaction: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Price per unit at the time of sale to admin panel",
    },

    // New fields for payment/transaction information:
    sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Date and time when the sale occurred",
    },

    sale_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Total sale amount for the transaction",
    },

    payment_status: {
        type: Sequelize.ENUM("Pending", "Completed", "Failed"),
        allowNull: false,
        defaultValue: "Pending",
        comment: "Payment status for the sale transaction",
    },

    payment_method: {
        type: Sequelize.ENUM("Bank Transfer", "Cash", "Online Payment"),
        allowNull: true,
        comment: "Method used for processing the payment",
    },

    transaction_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "Transaction identifier from the payment gateway",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the sale record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the sale record was last updated",
    },
}, {
    timestamps: true,
    tableName: "farmer_sales",
    comment: "Table storing sales transactions and associated payment details from farmers",
});

module.exports = farmerSalesSchema;
