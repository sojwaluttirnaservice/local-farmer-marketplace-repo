const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const farmerSchema = require("./farmerSchema");
const predefinedProductSchema = require("./predefinedProductSchema");

const farmerProductSchema = sequelize.define("farmer_products", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each farmer product entry",
    },

    farmer_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: farmerSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Reference to the farmer who added the product",
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
        comment: "Available quantity of the product in the farmer's listing",
    },

    is_available: {
        type: Sequelize.BOOLEAN,
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
        comment: "Expiry date for perishable items",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the farmer product record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the farmer product record was last updated",
    },
}, {
    timestamps: true,
    tableName: "farmer_products",
    comment: "Table storing products added by farmers from the predefined products list",
});

module.exports = farmerProductSchema;
