require("dotenv").config({ path: "./bin/.env" });

const db = require("../application/config/db.connect");
const distributionsDataQuery = require("../application/dummyDataQueries/distributionsDataQuery");
const donationsDataQuery = require("../application/dummyDataQueries/donationsDataQuery");
const donorsDataQuery = require("../application/dummyDataQueries/donorsDataQuery");
const recipientsDataQuery = require("../application/dummyDataQueries/recipientsDataQuery");
const requestsDataQuery = require("../application/dummyDataQueries/requestsDataQuery");
const { truncateAllTables, getSync } = require("./getSync");



/**
 * 
 * NOTE : THIS FUNCTION IS NOT WORKIGN PROPERLY AS OF NOW 
 */
const insertDummyData = async () => {
    try {
        // First, truncate all tables
        // console.log('Truncating all tables...');
        // await truncateAllTables(); // Ensure that all tables are truncated before inserting new data

        // Combine all the insert queries into one batch


        await getSync()
        console.log('Inserting dummy data in batch...');
        // await db.query(batchQuery); // Execute all queries in a single batch

        // await db.query // const batchQuery = `
        //     ${donorsDataQuery}; 
        //     ${recipientsDataQuery}; 
        //     ${donationsDataQuery}; 
        //     ${requestsDataQuery};
        //     ${distributionsDataQuery};
        // `;(donorsDataQuery);
        await db.query(donorsDataQuery);
        await db.query(recipientsDataQuery);
        await db.query(donationsDataQuery);
        await db.query(requestsDataQuery);
        await db.query(distributionsDataQuery)

        console.log('✅ Dummy data inserted successfully.');
    } catch (err) {
        console.error('❌ Error inserting dummy data:', err);
    }
};

insertDummyData();
