const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const adminSchema = sequelize.define("admins", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique admin ID",
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        comment: "Admin email",
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Hashed admin password",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Admin account creation timestamp",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Admin account update timestamp",
    },
}, {
    timestamps: true,
    tableName: "admins",
    comment: "Stores admin details",
});

module.exports = adminSchema;
