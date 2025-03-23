const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const donorSchema = sequelize.define("donors", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each donor",
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Donor's full name",
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        comment: "Donor's email address",
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Hashed donor password",
    },
    mobile: {
        type: Sequelize.STRING(15),
        allowNull: true,
        comment: "Donor's contact number",
    },
    address: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: "Donor's address",
    },
    food_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Type of food being donated",
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Quantity of food (in kg or servings)",
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "Food expiry date",
    },
    pickup_address: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: "Address for food pickup",
    },
    pickup_time: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "Preferred food pickup time",
    },
    status: {
        type: Sequelize.ENUM("PENDING", "PICKED_UP", "CANCELLED"),
        allowNull: false,
        defaultValue: "PENDING",
        comment: "Donation status",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when donor was created",
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when donor was last updated",
    },
}, {
    timestamps: true,
    tableName: "donors",
    comment: "Stores donor details",
});

module.exports = donorSchema;
