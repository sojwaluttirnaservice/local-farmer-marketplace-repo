const { checkUserAuth } = require("../../../application/controllers/auth/userAuthController");
const usersController = require("../../../application/controllers/usersController");
const getRouter = require("../../utils/getRouter");

const usersApiRouter = getRouter();


usersApiRouter.post('/', usersController.add)

usersApiRouter.put('/', checkUserAuth, usersController.update)

module.exports = usersApiRouter