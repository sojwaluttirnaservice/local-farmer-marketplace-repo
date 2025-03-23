const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const donorsRouter = require("./routes/donorsRouter")
const recipientsRouter = require("./routes/recipientsRouter")
const webPagesRouter = require("./routes/webPagesRouter")



const viewsRouter = getRouter()

viewsRouter.use('/', webPagesRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/donors', donorsRouter)

viewsRouter.use('/recipients', recipientsRouter)

module.exports = viewsRouter