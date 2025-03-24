const requestsDataQuery = `
INSERT INTO requests (recipient_id, donation_id, food_category_id, status, createdAt, updatedAt) VALUES
(1, 3, 1, 'pending', NOW(), NOW()),
(2, 5, 2, 'approved', NOW(), NOW()),
(3, 8, 3, 'rejected', NOW(), NOW()),
(4, 10, 4, 'pending', NOW(), NOW()),
(5, 2, 5, 'approved', NOW(), NOW()),
(6, 7, 6, 'pending', NOW(), NOW()),
(7, 4, 7, 'approved', NOW(), NOW()),
(8, 9, 8, 'pending', NOW(), NOW()),
(9, 1, 9, 'rejected', NOW(), NOW()),
(10, 6, 10, 'approved', NOW(), NOW()),
(11, 12, 11, 'pending', NOW(), NOW()),
(12, 14, 12, 'approved', NOW(), NOW()),
(13, 11, 13, 'pending', NOW(), NOW()),
(14, 13, 14, 'approved', NOW(), NOW()),
(15, 15, 15, 'rejected', NOW(), NOW());

`;

module.exports = requestsDataQuery;
