const donorsDataQuery =

    `
INSERT INTO donors(name, email, password, mobile, address, food_type, quantity, expiry_date, pickup_address, pickup_time, status, createdAt, updatedAt)
VALUES
    ('Amit Sharma', 'amit.sharma@example.com', '1234', '9876543210', '12 MG Road, Delhi', 'Rice', 10, '2025-03-30', '12 MG Road, Delhi', '2025-03-25 10:00:00', 'PENDING', NOW(), NOW()),
    ('Priya Mehta', 'priya.mehta@example.com', '1234', '9876543211', '56 Rajiv Chowk, Mumbai', 'Dal', 5, '2025-03-28', '56 Rajiv Chowk, Mumbai', '2025-03-24 14:00:00', 'PENDING', NOW(), NOW()),
    ('Rohan Verma', 'rohan.verma@example.com', '1234', '9876543212', '34 Lal Bagh, Bengaluru', 'Wheat', 8, '2025-03-27', '34 Lal Bagh, Bengaluru', '2025-03-23 09:00:00', 'PENDING', NOW(), NOW()),
    ('Neha Singh', 'neha.singh@example.com', '1234', '9876543213', '89 Park Street, Kolkata', 'Pulses', 12, '2025-03-29', '89 Park Street, Kolkata', '2025-03-26 16:00:00', 'PENDING', NOW(), NOW()),
    ('Vikram Rao', 'vikram.rao@example.com', '1234', '9876543214', '22 Jubilee Hills, Hyderabad', 'Flour', 20, '2025-04-02', '22 Jubilee Hills, Hyderabad', '2025-03-27 11:30:00', 'PENDING', NOW(), NOW()),
    ('Sneha Iyer', 'sneha.iyer@example.com', '1234', '9876543215', '102 MG Road, Chennai', 'Vegetables', 15, '2025-04-01', '102 MG Road, Chennai', '2025-03-28 13:00:00', 'PENDING', NOW(), NOW()),
    ('Aniket Joshi', 'aniket.joshi@example.com', '1234', '9876543216', '303 Koregaon Park, Pune', 'Fruits', 25, '2025-04-05', '303 Koregaon Park, Pune', '2025-03-29 15:00:00', 'PENDING', NOW(), NOW()),
    ('Kavita Choudhary', 'kavita.choudhary@example.com', '1234', '9876543217', '76 Civil Lines, Jaipur', 'Dairy Products', 18, '2025-04-03', '76 Civil Lines, Jaipur', '2025-03-30 12:00:00', 'PENDING', NOW(), NOW()),
    ('Suresh Patil', 'suresh.patil@example.com', '1234', '9876543218', '90 Kothrud, Pune', 'Bakery Items', 30, '2025-04-06', '90 Kothrud, Pune', '2025-03-31 17:00:00', 'PENDING', NOW(), NOW()),
    ('Divya Nair', 'divya.nair@example.com', '1234', '9876543219', '45 Sector 18, Noida', 'Canned Food', 10, '2025-04-07', '45 Sector 18, Noida', '2025-04-01 14:30:00', 'PENDING', NOW(), NOW()),

    ('Arjun Reddy', 'arjun.reddy@example.com', '1234', '9876543220', '67 Banjara Hills, Hyderabad', 'Milk', 12, '2025-04-08', '67 Banjara Hills, Hyderabad', '2025-04-02 10:00:00', 'PENDING', NOW(), NOW()),
    ('Meera Kapoor', 'meera.kapoor@example.com', '1234', '9876543221', '88 Chandni Chowk, Delhi', 'Bread', 8, '2025-04-09', '88 Chandni Chowk, Delhi', '2025-04-03 09:30:00', 'PENDING', NOW(), NOW()),
    ('Rahul Bansal', 'rahul.bansal@example.com', '1234', '9876543222', '21 Salt Lake, Kolkata', 'Sugar', 5, '2025-04-10', '21 Salt Lake, Kolkata', '2025-04-04 08:30:00', 'PENDING', NOW(), NOW()),
    ('Ayesha Khan', 'ayesha.khan@example.com', '1234', '9876543223', '60 Powai, Mumbai', 'Salt', 7, '2025-04-11', '60 Powai, Mumbai', '2025-04-05 11:00:00', 'PENDING', NOW(), NOW()),
    ('Manoj Desai', 'manoj.desai@example.com', '1234', '9876543224', '31 Jayanagar, Bengaluru', 'Tea', 9, '2025-04-12', '31 Jayanagar, Bengaluru', '2025-04-06 14:30:00', 'PENDING', NOW(), NOW()),
    ('Pooja Agarwal', 'pooja.agarwal@example.com', '1234', '9876543225', '78 Sector 15, Gurugram', 'Biscuits', 11, '2025-04-13', '78 Sector 15, Gurugram', '2025-04-07 16:30:00', 'PENDING', NOW(), NOW()),
    ('Yashwant Kumar', 'yashwant.kumar@example.com', '1234', '9876543226', '15 Hazratganj, Lucknow', 'Pasta', 13, '2025-04-14', '15 Hazratganj, Lucknow', '2025-04-08 12:30:00', 'PENDING', NOW(), NOW()),
    ('Sunita Pillai', 'sunita.pillai@example.com', '1234', '9876543227', '33 Connaught Place, Delhi', 'Chocolates', 14, '2025-04-15', '33 Connaught Place, Delhi', '2025-04-09 09:30:00', 'PENDING', NOW(), NOW()),
    ('Raj Malhotra', 'raj.malhotra@example.com', '1234', '9876543228', '11 Marine Drive, Mumbai', 'Soft Drinks', 20, '2025-04-16', '11 Marine Drive, Mumbai', '2025-04-10 15:00:00', 'PENDING', NOW(), NOW()),
    ('Shruti Joshi', 'shruti.joshi@example.com', '1234', '9876543229', '99 FC Road, Pune', 'Pickles', 22, '2025-04-17', '99 FC Road, Pune', '2025-04-11 17:30:00', 'PENDING', NOW(), NOW());
`




module.exports = donorsDataQuery