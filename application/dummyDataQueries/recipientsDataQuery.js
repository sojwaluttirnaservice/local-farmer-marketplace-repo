const recipientsDataQuery = `
INSERT INTO recipients (name, email, password, mobile, address, organization_name, food_category_id, requirement, delivery_address, delivery_time, status, createdAt, updatedAt) VALUES
('Amit Sharma', 'amit.sharma@email.com', '1234', '9876543210', '45, Andheri West, Mumbai', 'Helping Hands NGO', 1, 20, '45, Andheri West, Mumbai', '2025-04-05 10:00:00', 'PENDING', NOW(), NOW()),
('Sita Verma', 'sita.verma@email.com', '1234', '9876543211', '23, Connaught Place, Delhi', 'Food Relief India', 2, 30, '23, Connaught Place, Delhi', '2025-04-06 12:00:00', 'DELIVERED', NOW(), NOW()),
('Rahul Gupta', 'rahul.gupta@email.com', '1234', '9876543212', '88, Banjara Hills, Hyderabad', 'No Hunger Foundation', 3, 25, '88, Banjara Hills, Hyderabad', '2025-04-07 14:00:00', 'PENDING', NOW(), NOW()),
('Pooja Nair', 'pooja.nair@email.com', '1234', '9876543213', '12, Indiranagar, Bangalore', 'Community Kitchen', 4, 40, '12, Indiranagar, Bangalore', '2025-04-08 16:00:00', 'CANCELLED', NOW(), NOW()),
('Vikram Singh', 'vikram.singh@email.com', '1234', '9876543214', '55, Salt Lake, Kolkata', 'Mission Feed India', 5, 50, '55, Salt Lake, Kolkata', '2025-04-09 18:00:00', 'PENDING', NOW(), NOW()),
('Neha Agarwal', 'neha.agarwal@email.com', '1234', '9876543215', '99, Sector 18, Noida', 'Orphanage Trust', 6, 35, '99, Sector 18, Noida', '2025-04-10 08:00:00', 'DELIVERED', NOW(), NOW()),
('Rohan Mehta', 'rohan.mehta@email.com', '1234', '9876543216', '20, JP Nagar, Bangalore', 'Rural Support Group', 7, 22, '20, JP Nagar, Bangalore', '2025-04-11 09:00:00', 'PENDING', NOW(), NOW()),
('Divya Kapoor', 'divya.kapoor@email.com', '1234', '9876543217', '75, Gachibowli, Hyderabad', NULL, 8, 28, '75, Gachibowli, Hyderabad', NULL, 'PENDING', NOW(), NOW()),
('Manish Tiwari', 'manish.tiwari@email.com', '1234', '9876543218', '200, Shivaji Nagar, Pune', 'Food Bank Society', 9, 15, '200, Shivaji Nagar, Pune', '2025-04-13 11:00:00', 'DELIVERED', NOW(), NOW()),
('Simran Kaur', 'simran.kaur@email.com', '1234', '9876543219', '15, Aluva, Kochi', NULL, 10, 18, '15, Aluva, Kochi', '2025-04-14 15:00:00', 'PENDING', NOW(), NOW()),
('Anuj Saxena', 'anuj.saxena@email.com', '1234', '9876543220', '110, Rajarhat, Kolkata', 'Humanity First', 11, 30, '110, Rajarhat, Kolkata', '2025-04-15 17:00:00', 'CANCELLED', NOW(), NOW()),
('Priya Iyer', 'priya.iyer@email.com', '1234', '9876543221', '60, MG Road, Chennai', 'Local Food Help', 12, 20, '60, MG Road, Chennai', '2025-04-16 18:00:00', 'PENDING', NOW(), NOW()),
('Kunal Joshi', 'kunal.joshi@email.com', '1234', '9876543222', '77, Bandra West, Mumbai', NULL, 13, 25, '77, Bandra West, Mumbai', '2025-04-17 19:00:00', 'DELIVERED', NOW(), NOW()),
('Megha Chauhan', 'megha.chauhan@email.com', '1234', '9876543223', '140, Connaught Place, Delhi', 'Hunger-Free India', 14, 45, '140, Connaught Place, Delhi', '2025-04-18 20:00:00', 'PENDING', NOW(), NOW()),
('Yash Desai', 'yash.desai@email.cem', '1234', '9876543224', '39, Green Street, Ahmedabad', NULL, 15, 32, '39, Green Street, Ahmedabad', '2025-04-19 21:00:00', 'CANCELLED', NOW(), NOW());
`;

module.exports = recipientsDataQuery;
