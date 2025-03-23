const distributionsDataQuery =
    `
INSERT INTO distributions (request_id, assigned_to, delivery_status, delivered_at, createdAt, updatedAt) VALUES
(1, 'Ramesh Kumar', 'delivered', '2024-03-21 14:30:00', NOW(), NOW()),
(2, 'Priya Sharma', 'on_the_way', NULL, NOW(), NOW()),
(3, 'Amit Patel', 'pending', NULL, NOW(), NOW()),
(4, 'Suman Verma', 'delivered', '2024-03-20 18:15:00', NOW(), NOW()),
(5, 'Vikram Singh', 'on_the_way', NULL, NOW(), NOW());
`
module.exports = distributionsDataQuery