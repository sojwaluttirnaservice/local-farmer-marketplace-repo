const foodCategoriesSchema = require("../schemas/foodCategoriesSchema")

const q = `

INSERT INTO food_categories (category_name, createdAt, updatedAt) VALUES
('Fruits & Vegetables', NOW(), NOW()),
('Grains & Cereals', NOW(), NOW()),
('Dairy Products', NOW(), NOW()),
('Bakery & Confectionery', NOW(), NOW()),
('Meat & Poultry', NOW(), NOW()),
('Seafood', NOW(), NOW()),
('Beverages', NOW(), NOW()),
('Canned & Packaged Foods', NOW(), NOW()),
('Frozen Foods', NOW(), NOW()),
('Snacks', NOW(), NOW()),
('Spices & Condiments', NOW(), NOW()),
('Oils & Fats', NOW(), NOW()),
('Legumes & Pulses', NOW(), NOW()),
('Ready-to-Eat Meals', NOW(), NOW()),
('Organic & Health Foods', NOW(), NOW()),
('Baby Food', NOW(), NOW()),
('Instant & Processed Foods', NOW(), NOW()),
('Sugars & Sweeteners', NOW(), NOW()),
('Nuts & Dry Fruits', NOW(), NOW()),
('Traditional & Regional Foods', NOW(), NOW());
`


module.exports = foodCategoriesSchema