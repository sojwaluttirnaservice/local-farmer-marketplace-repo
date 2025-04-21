const distributionsDataQuery =
    `
INSERT INTO distributions (request_id, donation_id, food_category_id, assigned_to, delivery_status, delivered_at, createdAt, updatedAt) VALUES
(1, 3, 1, 'Rahul Sharma', 'pending', NULL, NOW(), NOW()),
(2, 5, 2, 'Priya Verma', 'on_the_way', NULL, NOW(), NOW()),
(3, 8, 3, 'Amit Kumar', 'delivered', NOW(), NOW(), NOW()),
(4, 10, 4, 'Sneha Joshi', 'pending', NULL, NOW(), NOW()),
(5, 2, 5, 'Rajesh Singh', 'delivered', NOW(), NOW(), NOW()),
(6, 7, 6, 'Neha Patel', 'on_the_way', NULL, NOW(), NOW()),
(7, 4, 7, 'Vikram Rao', 'pending', NULL, NOW(), NOW()),
(8, 9, 8, 'Anjali Das', 'delivered', NOW(), NOW(), NOW()),
(9, 1, 9, 'Rohit Mehta', 'pending', NULL, NOW(), NOW()),
(10, 6, 10, 'Manish Agarwal', 'on_the_way', NULL, NOW(), NOW()),
(11, 12, 11, 'Pooja Kulkarni', 'delivered', NOW(), NOW(), NOW()),
(12, 14, 12, 'Deepak Choudhary', 'pending', NULL, NOW(), NOW()),
(13, 11, 13, 'Kiran Sharma', 'delivered', NOW(), NOW(), NOW()),
(14, 13, 14, 'Asha Menon', 'on_the_way', NULL, NOW(), NOW()),
(15, 15, 15, 'Sanjay Pillai', 'delivered', NOW(), NOW(), NOW());

`
module.exports = distributionsDataQuery