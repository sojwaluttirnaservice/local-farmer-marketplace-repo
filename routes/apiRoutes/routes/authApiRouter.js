const authApiController = require("../../../application/controllers/apiControllers/authApiController");
const getRouter = require("../../utils/getRouter");

const authApiRouter = getRouter();

// authApiRouter.post('/register/donor')

// authApiRouter.post('/register/recipient')


// for amdin login
authApiRouter.post('/admin', authApiController.loginAdmin)

// authApiRouter.post('/login')

// authApiRouter.post('/logout')

// authApiRouter.get('/profile')

module.exports = authApiRouter