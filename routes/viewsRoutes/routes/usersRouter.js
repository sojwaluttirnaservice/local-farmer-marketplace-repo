const { checkAdminAuth } = require("../../../application/controllers/auth/adminAuthController");
const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const usersController = require("../../../application/controllers/usersController");
const getRouter = require("../../utils/getRouter");

const usersRouter = getRouter();


// Since this is views router we have all get requress here

//  @Get 
// 

// /dashboard


usersRouter.get('/', checkAdminAuth, usersController.renderUsersPage)


usersRouter.get('/dashboard', checkUserAuth, usersController.renderUserDashboardPage)

// /profile

usersRouter.get('/profile', checkUserAuth, usersController.renderUserProfilePage)

// /cart

// usersRouter.get('/cart')


// 

module.exports = usersRouter