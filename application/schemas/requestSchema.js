const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const requestSchema = sequelize.define("requests", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique request ID",
    },
    recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "recipients", key: "id" }, // Updated reference
        onDelete: "CASCADE",
        comment: "Foreign key linking to recipients",
    },
    donation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "donations", key: "id" },
        onDelete: "CASCADE",
        comment: "Foreign key linking to donations",
    },
    status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
        comment: "Status of the request",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Request creation timestamp",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Request update timestamp",
    },
}, {
    timestamps: true,
    tableName: "requests",
    comment: "Stores food requests made by recipients",
});

module.exports = requestSchema;
