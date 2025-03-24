const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const foodCategoriesSchema = sequelize.define(
    "food_categories",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: "Unique ID for food category",
        },
        category_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: "Standardized food category name",
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        timestamps: true,
        tableName: "food_categories",
        comment: "Stores standardized food categories",
    }
);

module.exports = foodCategoriesSchema;
