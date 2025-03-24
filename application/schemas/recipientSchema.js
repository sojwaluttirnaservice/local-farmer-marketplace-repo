const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const recipientSchema = sequelize.define("recipients", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each recipient",
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Recipient's full name",
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        comment: "Recipient's email address",
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Hashed recipient password",
    },
    mobile: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: true,
        comment: "Recipient's contact number",
    },
    address: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: "Recipient's address",
    },
    organization_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Name of recipient's organization (if applicable)",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when recipient was created",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when recipient was last updated",
    },
}, {
    timestamps: true,
    tableName: "recipients",
    comment: "Stores recipient details",
    indexes: [
        { fields: ["email"], unique: true },
        { fields: ["mobile"], unique: true }
    ],
});

module.exports = recipientSchema;
