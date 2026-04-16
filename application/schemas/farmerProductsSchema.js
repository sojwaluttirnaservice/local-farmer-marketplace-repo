const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const farmerSchema = require("./farmerSchema");
const predefinedProductSchema = require("./predefinedProductSchema");

const farmerProductsSchema = sequelize.define("farmer_products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each farmer's product",
    },

    farmer_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: farmerSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the farmer owning the product",
    },

    predefined_product_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: predefinedProductSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the predefined product",
    },

    stock_quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: "Available stock quantity of the product",
    },

    is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Availability status of the product",
    },

    harvest_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: "Date when the product was harvested",
    },

    expiry_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: "Expiry date of the product",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the product record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the product record was last updated",
    },
}, {
    timestamps: true,
    tableName: "farmer_products",
    comment: "Table storing products available with farmers",
});

module.exports = farmerProductsSchema;
