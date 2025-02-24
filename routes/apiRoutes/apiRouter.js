const getRouter = require("../utils/getRouter");
const authApiRouter = require("./routes/authApiRouter");
const farmersApiRouter = require("./routes/farmersApiRouter");
const productsApiRouter = require("./routes/productsApiRouter");


const apiRouter = getRouter()




apiRouter.use('/auth', authApiRouter)

apiRouter.use('/farmers', farmersApiRouter)

apiRouter.use('/products', productsApiRouter)



module.exports = apiRouter