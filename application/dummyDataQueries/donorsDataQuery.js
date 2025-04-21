const donorsDataQuery =

    `
INSERT INTO donors (name, email, password, mobile, address, createdAt, updatedAt) VALUES
('Ramesh Gupta', 'ramesh.gupta@example.com', '1234', '9876543210', '123, MG Road, Mumbai, Maharashtra', NOW(), NOW()),
('Priya Sharma', 'priya.sharma@example.com', '1234', '9823456789', '45, Park Avenue, Pune, Maharashtra', NOW(), NOW()),
('Amit Verma', 'amit.verma@example.com', '1234', '9012345678', '78, Green Street, Delhi', NOW(), NOW()),
('Neha Kapoor', 'neha.kapoor@example.com', '1234', '7890123456', '32, Banjara Hills, Hyderabad, Telangana', NOW(), NOW()),
('Sanjay Rao', 'sanjay.rao@example.com', '1234', '9567890123', '89, Indiranagar, Bangalore, Karnataka', NOW(), NOW()),
('Anjali Desai', 'anjali.desai@example.com', '1234', '9087654321', '20, Salt Lake, Kolkata, West Bengal', NOW(), NOW()),
('Vikram Iyer', 'vikram.iyer@example.com', '1234', '9876123456', '50, Sector 18, Noida, Uttar Pradesh', NOW(), NOW()),
('Kiran Joshi', 'kiran.joshi@example.com', '1234', '9812345670', '99, JP Nagar, Bangalore, Karnataka', NOW(), NOW()),
('Meera Nair', 'meera.nair@example.com', '1234', '9701234567', '77, Aluva, Kochi, Kerala', NOW(), NOW()),
('Rajesh Patil', 'rajesh.patil@example.com', '1234', '9623456789', '88, Shivaji Nagar, Pune, Maharashtra', NOW(), NOW()),
('Swati Saxena', 'swati.saxena@example.com', '1234', '9521345678', '120, Connaught Place, Delhi', NOW(), NOW()),
('Arjun Pillai', 'arjun.pillai@example.com', '1234', '9456789012', '150, MG Road, Chennai, Tamil Nadu', NOW(), NOW()),
('Divya Sen', 'divya.sen@example.com', '1234', '9345678901', '65, Rajarhat, Kolkata, West Bengal', NOW(), NOW()),
('Sunil Mehta', 'sunil.mehta@example.com', '1234', '9234567890', '210, Bandra West, Mumbai, Maharashtra', NOW(), NOW()),
('Pooja Agarwal', 'pooja.agarwal@example.com', '1234', '9123456789', '15, Gachibowli, Hyderabad, Telangana', NOW(), NOW());

    `




module.exports = donorsDataQuery