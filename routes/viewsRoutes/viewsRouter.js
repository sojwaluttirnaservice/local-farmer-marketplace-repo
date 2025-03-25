const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const donationsRouter = require("./routes/donationsRouter")
const donorsRouter = require("./routes/donorsRouter")
const recipientsRouter = require("./routes/recipientsRouter")
const requestsRouter = require("./routes/requestsRouter")
const webPagesRouter = require("./routes/webPagesRouter")



const viewsRouter = getRouter()

viewsRouter.use('/', webPagesRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/donors', donorsRouter)

viewsRouter.use('/recipients', recipientsRouter)

viewsRouter.use('/donations', donationsRouter)

viewsRouter.use('/requests', requestsRouter)

viewsRouter.use('/requests', requestsRouter)

module.exports = viewsRouter