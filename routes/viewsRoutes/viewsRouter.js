const indexController = require("../../application/controllers/indexController")
const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const cartRouter = require("./routes/cartRouter")
const farmersRouter = require("./routes/farmersRouter")
const ordersRouter = require("./routes/ordersRouter")
const productsRouter = require("./routes/productsRouter")
const salesRouter = require("./routes/salesRouter")
const usersRouter = require("./routes/usersRouter")


const viewsRouter = getRouter()

viewsRouter.get('/', indexController.renderHomePage)



viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/farmers', farmersRouter)

viewsRouter.use('/products', productsRouter)

viewsRouter.use('/sales', salesRouter)

viewsRouter.use('/users', usersRouter)

viewsRouter.use('/cart', cartRouter)

viewsRouter.use('/orders', ordersRouter)


module.exports = viewsRouter