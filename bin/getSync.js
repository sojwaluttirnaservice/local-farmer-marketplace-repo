
const { Sequelize } = require('sequelize');
const sequelize = require('../application/config/sequelize');

const donorSchema = require('../application/schemas/donorSchema');
const recipientSchema = require('../application/schemas/recipientSchema');
const adminSchema = require('../application/schemas/adminSchema');
const distributionSchema = require('../application/schemas/distributionSchema');
const requestSchema = require('../application/schemas/requestSchema');
const donationSchema = require('../application/schemas/donationSchema');


const createDatabaseIfNotExists = async () => {
    try {
        // Create a new Sequelize instance without specifying a database
        const tempSequelize = new Sequelize({
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            dialect: "mysql", // Change this if using PostgreSQL or other DB
        });

        // Check if database exists
        const [results] = await tempSequelize.query(`SHOW DATABASES LIKE '${process.env.DB_DATABASE}'`);

        if (results.length === 0) {
            console.log(`⚠️  Database '${process.env.DB_DATABASE}' does not exist. Creating...`);
            await tempSequelize.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
            console.log(`✅ Database '${process.env.DB_DATABASE}' created successfully.`);
        } else {
            console.log(`✅ Database '${process.env.DB_DATABASE}' already exists.`);
        }

        await tempSequelize.close(); // Close the temporary connection
    } catch (error) {
        console.error("❌ Error while checking/creating database:", error);
        process.exit(1);
    }
};


const truncateAllTables = async () => {

    try {


        // Run migration first in case
        getSync();


        // Then see the tables names
        for (const modelName of Object.keys(sequelize.models)) {
            const model = sequelize.models[modelName]

            console.log(`Truncating model : ${modelName}`)


            // Ensure the model has the truncate method (it should for Sequelize models)
            if (model && model.truncate) {
                await model.truncate({ cascade: true })
                console.log(`✅ Table ${modelName} truncated successfully.`);
            }
            else {
                throw new Error(`Model with name ${modelName} not found`)
                break
            }
        }

    } catch (err) {
        console.error('Error:', err);
    }
}




const getSync = async () => {
    try {
        await createDatabaseIfNotExists(); // Ensure DB exists before syncing



        let { models } = await sequelize.sync({ alter: true });

        console.log(`✅ Total tables created: ${Object.keys(models)?.length}`);

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            `Database ${process.env.DB_DATABASE} on host ${process.env.DB_HOST} has been migrated successfully in "${process.env.PROJECT_ENV}" mode. You can now start the server.`
        );

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            'Use command: npm start (to start the server)'
        );

        process.exit();
    } catch (err) {
        console.error("❌ Error during database sync:", err);
        process.exit(1);
    }
};

module.exports = { getSync, truncateAllTables };
