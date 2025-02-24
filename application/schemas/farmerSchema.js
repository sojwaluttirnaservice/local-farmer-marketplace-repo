const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Define the Farmer Schema
const farmerSchema = sequelize.define("farmers", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each farmer",
    },

    farmer_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Full name of the farmer",
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        comment: "Email address of the farmer",
    },

    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Password for farmer account",
    },

    mobile: {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate: {
            len: [10, 15],
        },
        comment: "Contact number of the farmer",
    },

    address: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Residential address of the farmer",
    },

    farm_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Name of the farmer's farm",
    },

    farm_location: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Location of the farm",
    },

    established_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Year the farm was established",
    },

    farm_size: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Size of the farm in acres",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the farmer record was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the farmer record was last updated",
    },
}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    tableName: "farmers",
    comment: "Table storing farmer details for the marketplace",
});

// Export the model
module.exports = farmerSchema;
