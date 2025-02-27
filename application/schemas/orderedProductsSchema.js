const Sequelize = require("sequelize");

const sequelize = require("../config/sequelize");
const predefinedProductSchema = require("./predefinedProductSchema");
const orderSchema = require("./orderSchema");

// Cart Schema
const orderedProductsSchema = sequelize.define("ordered_products", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each cart item",
    },


    order_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: orderSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Order id to which it belongs",
    },

    predefined_product_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: predefinedProductSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Product added to the ordered item",
    },


    product_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Name of the product",
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Quantity of the products",
    },
    

    price_at_order_time: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Price of the product at the time of order",
    },

    total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "price_at_order_time * quantity",
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
    tableName: "ordered_products",
    comment: "Table storing ordered product details",
});


module.exports = orderedProductsSchema;