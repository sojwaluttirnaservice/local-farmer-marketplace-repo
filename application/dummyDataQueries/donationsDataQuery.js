const donationsDataQuery =
    `
INSERT INTO donations (donor_id, food_category_id, quantity, expiry_date, pickup_address, pickup_time, status, createdAt, updatedAt) VALUES
(1, 1, 10, '2025-04-10', '123, MG Road, Mumbai, Maharashtra', '2025-04-05 10:00:00', 'available', NOW(), NOW()),
(2, 3, 20, '2025-04-12', '45, Park Avenue, Pune, Maharashtra', '2025-04-06 11:00:00', 'available', NOW(), NOW()),
(3, 5, 15, '2025-04-15', '78, Green Street, Delhi', '2025-04-07 12:00:00', 'available', NOW(), NOW()),
(4, 7, 25, '2025-04-08', '32, Banjara Hills, Hyderabad, Telangana', '2025-04-04 13:00:00', 'assigned', NOW(), NOW()),
(5, 2, 30, '2025-04-20', '89, Indiranagar, Bangalore, Karnataka', '2025-04-10 14:00:00', 'available', NOW(), NOW()),
(6, 8, 18, '2025-04-18', '20, Salt Lake, Kolkata, West Bengal', '2025-04-09 15:00:00', 'completed', NOW(), NOW()),
(7, 10, 22, '2025-04-22', '50, Sector 18, Noida, Uttar Pradesh', '2025-04-12 16:00:00', 'available', NOW(), NOW()),
(8, 4, 12, '2025-04-17', '99, JP Nagar, Bangalore, Karnataka', '2025-04-08 17:00:00', 'assigned', NOW(), NOW()),
(9, 6, 35, '2025-04-25', '77, Aluva, Kochi, Kerala', '2025-04-15 18:00:00', 'available', NOW(), NOW()),
(10, 9, 28, '2025-04-14', '88, Shivaji Nagar, Pune, Maharashtra', '2025-04-07 19:00:00', 'expired', NOW(), NOW()),
(11, 12, 40, '2025-04-30', '120, Connaught Place, Delhi', '2025-04-20 20:00:00', 'available', NOW(), NOW()),
(12, 14, 50, '2025-05-05', '150, MG Road, Chennai, Tamil Nadu', '2025-04-25 21:00:00', 'available', NOW(), NOW()),
(13, 11, 17, '2025-04-28', '65, Rajarhat, Kolkata, West Bengal', '2025-04-18 22:00:00', 'completed', NOW(), NOW()),
(14, 13, 45, '2025-04-27', '210, Bandra West, Mumbai, Maharashtra', '2025-04-22 23:00:00', 'assigned', NOW(), NOW()),
(15, 15, 55, '2025-05-10', '15, Gachibowli, Hyderabad, Telangana', '2025-04-30 08:00:00', 'available', NOW(), NOW());

`


module.exports = donationsDataQuery