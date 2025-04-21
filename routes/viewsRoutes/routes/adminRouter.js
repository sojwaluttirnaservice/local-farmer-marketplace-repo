// const adminController = require("../../../application/controllers/admin/adminController");
const adminViewController = require("../../../application/controllers/viewsControllers/adminViewController");
const { checkAdminAuth } = require("../../../application/middlewares/authMiddleware");
const asyncHandler = require("../../../application/utils/asyncHandler");
const { renderPage } = require("../../../application/utils/responses/ApiResponse");
const getRouter = require("../../utils/getRouter");

const adminRouter = getRouter();


// adminRouter.get('/login', adminController.renderAdminLoginPage)

adminRouter.get('/dashboard', checkAdminAuth, adminViewController.dashboard)

module.exports = adminRouter