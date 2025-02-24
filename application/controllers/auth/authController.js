const asyncHandler = require("../../utils/asyncHandler");

const authController = {

    checkAdminOrFarmerAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;

        if (process.env.PROJECT_ENV == 'DEV') {
            next();
            return;
        }

        if (session.admin || session.farmer) {
            next();
            return;
        }

        res.redirect("/auth/login");
    }),

    checkAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;



        if (session.admin || session.farmer || session.user) {
            next();
            return;
        }

        res.redirect("/auth/login");
    }),

}

module.exports = authController;