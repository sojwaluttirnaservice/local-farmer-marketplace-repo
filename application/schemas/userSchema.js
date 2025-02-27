const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Define the User Registration Schema
const userSchema = sequelize.define("users", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each user",
    },

    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "User's full name",
    },

    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        comment: "User's email address",
    },

    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Hashed user password",
    },

    mobile: {
        type: Sequelize.STRING(15),
        allowNull: true,
        comment: "User's contact number",
    },

    address: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: '',
        comment: "User's address for delivery purposes",
    },


    role: {
        type: Sequelize.ENUM("user"),
        allowNull: false,
        defaultValue: "user",
        comment: "Role of the user",
    },

    status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "SUSPENDED"),
        allowNull: false,
        defaultValue: "ACTIVE",
        comment: "Status of the user (ACTIVE/INACTIVE/SUSPENDED)",
    },

    user_type: {
        type: Sequelize.ENUM("PREMIUM", "NORMAL"),
        allowNull: false,
        defaultValue: "NORMAL",
        comment: "Type of user (PREMIUM/NORMAL)",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the user was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Timestamp when the user was last updated",
    },

}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    tableName: "users",
    comment: "Stores user registration details",
});

// Export the model
module.exports = userSchema;
