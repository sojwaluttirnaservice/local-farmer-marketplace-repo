const getRouter = require("../utils/getRouter");
const authApiRouter = require("./routes/authApiRouter");
const cartApiRouter = require("./routes/cartApiRouter");
const farmersApiRouter = require("./routes/farmersApiRouter");
const ordersApiRouter = require("./routes/ordersApiRouter");
const productsApiRouter = require("./routes/productsApiRouter");
const salesApiRouter = require("./routes/salesApiRouter");
const usersApiRouter = require("./routes/usersApiRouter");


const apiRouter = getRouter()




apiRouter.use('/auth', authApiRouter)

apiRouter.use('/farmers', farmersApiRouter)

apiRouter.use('/products', productsApiRouter)

apiRouter.use('/sales', salesApiRouter)

apiRouter.use('/cart', cartApiRouter);



apiRouter.use('/users', usersApiRouter)


apiRouter.use('/orders', ordersApiRouter)




module.exports = apiRouter