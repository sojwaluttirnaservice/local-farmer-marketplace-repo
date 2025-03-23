const recipientsDataQuery = `
INSERT INTO recipients (name, email, password, mobile, address, organization_name, requirement, delivery_address, delivery_time, status, createdAt, updatedAt)
VALUES
    ('Rahul Sharma', 'rahul.sharma@example.com', '1234', '9876543200', '45 Connaught Place, Delhi', 'Helping Hands NGO', 10, '45 Connaught Place, Delhi', '2025-03-25 11:00:00', 'PENDING', NOW(), NOW()),
    ('Anjali Verma', 'anjali.verma@example.com', '1234', '9876543201', '67 Andheri East, Mumbai', 'Food for All', 5, '67 Andheri East, Mumbai', '2025-03-26 14:30:00', 'PENDING', NOW(), NOW()),
    ('Vikram Singh', 'vikram.singh@example.com', '1234', '9876543202', '90 Koramangala, Bengaluru', 'Hope Foundation', 8, '90 Koramangala, Bengaluru', '2025-03-27 10:00:00', 'PENDING', NOW(), NOW()),
    ('Sneha Nair', 'sneha.nair@example.com', '1234', '9876543203', '23 Salt Lake, Kolkata', NULL, 6, '23 Salt Lake, Kolkata', '2025-03-28 16:00:00', 'PENDING', NOW(), NOW()),
    ('Amit Joshi', 'amit.joshi@example.com', '1234', '9876543204', '77 Banjara Hills, Hyderabad', 'Care & Share Org', 15, '77 Banjara Hills, Hyderabad', '2025-03-29 12:00:00', 'PENDING', NOW(), NOW()),
    ('Kavita Desai', 'kavita.desai@example.com', '1234', '9876543205', '34 MG Road, Chennai', 'Helping Hearts', 20, '34 MG Road, Chennai', '2025-03-30 13:30:00', 'PENDING', NOW(), NOW()),
    ('Ramesh Patel', 'ramesh.patel@example.com', '1234', '9876543206', '12 FC Road, Pune', NULL, 12, '12 FC Road, Pune', '2025-03-31 15:00:00', 'PENDING', NOW(), NOW()),
    ('Priya Kapoor', 'priya.kapoor@example.com', '1234', '9876543207', '56 Civil Lines, Jaipur', 'Food Relief Program', 18, '56 Civil Lines, Jaipur', '2025-04-01 10:30:00', 'PENDING', NOW(), NOW()),
    ('Manoj Pillai', 'manoj.pillai@example.com', '1234', '9876543208', '89 Sector 22, Noida', NULL, 7, '89 Sector 22, Noida', '2025-04-02 09:00:00', 'PENDING', NOW(), NOW()),
    ('Divya Reddy', 'divya.reddy@example.com', '1234', '9876543209', '30 Jubilee Hills, Hyderabad', 'Aasha Trust', 25, '30 Jubilee Hills, Hyderabad', '2025-04-03 17:30:00', 'PENDING', NOW(), NOW()),

    ('Suresh Bansal', 'suresh.bansal@example.com', '1234', '9876543210', '22 Lal Bagh, Bengaluru', 'New Hope NGO', 10, '22 Lal Bagh, Bengaluru', '2025-04-04 11:00:00', 'PENDING', NOW(), NOW()),
    ('Pooja Malhotra', 'pooja.malhotra@example.com', '1234', '9876543211', '77 Park Street, Kolkata', NULL, 5, '77 Park Street, Kolkata', '2025-04-05 13:00:00', 'PENDING', NOW(), NOW()),
    ('Arun Kumar', 'arun.kumar@example.com', '1234', '9876543212', '55 Jayanagar, Bengaluru', 'Food for Needy', 8, '55 Jayanagar, Bengaluru', '2025-04-06 12:30:00', 'PENDING', NOW(), NOW()),
    ('Meera Sen', 'meera.sen@example.com', '1234', '9876543213', '11 Kothrud, Pune', NULL, 6, '11 Kothrud, Pune', '2025-04-07 14:30:00', 'PENDING', NOW(), NOW()),
    ('Rajesh Gupta', 'rajesh.gupta@example.com', '1234', '9876543214', '101 Powai, Mumbai', 'Anna Daan Mission', 15, '101 Powai, Mumbai', '2025-04-08 10:00:00', 'PENDING', NOW(), NOW()),
    ('Neha Choudhary', 'neha.choudhary@example.com', '1234', '9876543215', '88 Marine Drive, Mumbai', NULL, 20, '88 Marine Drive, Mumbai', '2025-04-09 09:30:00', 'PENDING', NOW(), NOW()),
    ('Aniket Iyer', 'aniket.iyer@example.com', '1234', '9876543216', '45 Hazratganj, Lucknow', 'Food Lifeline', 12, '45 Hazratganj, Lucknow', '2025-04-10 16:30:00', 'PENDING', NOW(), NOW()),
    ('Sunita Rao', 'sunita.rao@example.com', '1234', '9876543217', '76 Sector 15, Gurugram', NULL, 8, '76 Sector 15, Gurugram', '2025-04-11 15:00:00', 'PENDING', NOW(), NOW()),
    ('Yashwant Desai', 'yashwant.desai@example.com', '1234', '9876543218', '99 Chandni Chowk, Delhi', 'Nourish India', 22, '99 Chandni Chowk, Delhi', '2025-04-12 11:30:00', 'PENDING', NOW(), NOW()),
    ('Shruti Kapoor', 'shruti.kapoor@example.com', '1234', '9876543219', '33 Koregaon Park, Pune', NULL, 18, '33 Koregaon Park, Pune', '2025-04-13 17:00:00', 'PENDING', NOW(), NOW());`;

module.exports = recipientsDataQuery;
