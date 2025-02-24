const Sequelize = require("sequelize");

const sequelize = require("../config/sequelize");
const productSchema = require("./predefinedProductSchema");
const userSchema = require("./userSchema");

// Review & Rating Schema
const reviewSchema = sequelize.define("reviews", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each review",
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: userSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "User giving the review",
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: productSchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        comment: "Product being reviewed",
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        },
        comment: "Rating given by the user (1 to 5)",
    },
    review_text: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Optional detailed review",
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
});
