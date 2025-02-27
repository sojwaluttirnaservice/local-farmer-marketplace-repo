const asyncHandler = require("../../utils/asyncHandler");

const authController = {


    // JUST CHECK EITHER ROLE SHOULD BE LOGGED IN 
    checkAuth: asyncHandler(async (req, res, next) => {

        const session = req.session;



        if (session.admin || session.farmer || session.user) {
            next();
            return;
        }

        res.redirect("/auth/login");
    }),

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



    checkAdminOrUserAuth: asyncHandler(async (req, res, next) => {
        const session = req.session;

        if (process.env.PROJECT_ENV == 'DEV') {
            next();
            return
        }


        if (session.admin || session.user) {
            next();
            return;
        }

        res.redirect("/");
    }),

}

module.exports = authController;