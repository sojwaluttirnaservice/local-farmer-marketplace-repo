const getRouter = require("../../../utils/getRouter");
const authViewController = require("../../../../application/controllers/viewsControllers/authViewController");

const authRouter = getRouter();


// Routes for pages


authRouter.get('/admin', authViewController.renderAdminLoginPage)

authRouter.get('/login', authViewController.renderLoginPage)

authRouter.get('/signup', authViewController.renderSignupPage)


module.exports = authRouter;
