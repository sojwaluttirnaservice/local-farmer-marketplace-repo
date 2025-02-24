
const sequelize = require('../application/config/sequelize');
const adminSchema = require('../application/schemas/adminSchema');
const cartSchema = require('../application/schemas/cartSchema');
const farmerProductSchema = require('../application/schemas/farmerProductSchema');
const farmerSchema = require('../application/schemas/farmerSchema');
const orderSchema = require('../application/schemas/orderSchema');
const paymentSchema = require('../application/schemas/paymentSchema');
const predefinedProductSchema = require('../application/schemas/predefinedProductSchema');
const userSchema = require('../application/schemas/userSchema');










const getSync = () => {
    sequelize
        .sync({ alter: true })
        .then(() => {
            console.log(
                '\x1b[47m", \x1b[30m%s\x1b[0m',
                'Database has been migrated successfully, you can now start the server.'
            );
            console.log('\x1b[47m", \x1b[30m%s\x1b[0m', 'Use command: npm start (to start the server)');
            process.exit();
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = getSync;
