const donationsDataQuery =
    `
INSERT INTO donations (donor_id, food_type, quantity, expiry_date, status, createdAt, updatedAt) VALUES
(1, 'Rice and Dal', '10 kg', '2025-04-10', 'available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Bread and Butter', '50 packets', '2025-03-30', 'available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Vegetables', '20 kg', '2025-04-05', 'assigned', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Milk Packets', '30 liters', '2025-04-02', 'available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Biscuits', '100 packets', '2025-04-15', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Cooked Meals', '25 plates', '2025-03-29', 'expired', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Fruits', '15 kg', '2025-04-08', 'available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Bottled Water', '100 bottles', '2025-04-12', 'available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Canned Food', '30 cans', '2025-05-01', 'assigned', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Dry Ration', '50 kg', '2025-04-20', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

`


module.exports = donationsDataQuery