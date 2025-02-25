const asyncHandler = require("../../application/utils/asyncHandler")
const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/auth/authRouter")
const farmersRouter = require("./routes/farmersRouter")
const productsRouter = require("./routes/productsRouter")
const salesRouter = require("./routes/salesRouter")


const viewsRouter = getRouter()

viewsRouter.get('/', asyncHandler(async (req, res) => {
    let session = req.session

    let { candidate, admin, company } = session

    if (candidate) {
        return res.redirect('/candidate/dashboard')
    }
    if (admin) {
        return res.redirect('/admin/dashboard')
    }
    if (company) {
        return res.redirect('/company/dashboard')
    }
    renderPage(res, 'homepage.ejs', { title: 'Homepage' })
}))


viewsRouter.use('/admin', adminRouter)

viewsRouter.use('/auth', authRouter)

viewsRouter.use('/farmers', farmersRouter)

viewsRouter.use('/products', productsRouter)

viewsRouter.use('/sales', salesRouter)



module.exports = viewsRouter