const requestsDataQuery = `
INSERT INTO requests (recipient_id, donation_id, status, createdAt, updatedAt) VALUES
(1, 3, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 5, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 7, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 2, 'rejected', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 6, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 8, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 9, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 1, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 4, 'rejected', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 10, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;

module.exports = requestsDataQuery;
