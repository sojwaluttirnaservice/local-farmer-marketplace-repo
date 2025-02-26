const candidateModel = require("../../models/farmersModel");
const usersModel = require("../../models/usersModel");
const asyncHandler = require("../../utils/asyncHandler");
const { paths } = require("../../utils/files/createDirectories");
const { sendResponse } = require("../../utils/responses/ApiResponse");

const userAuthController = {

    checkUserAuth: asyncHandler(async (req, res, next) => {

        let session = req.session

        let requestType = req.method;

        let isGetRequest = requestType === "GET"

        if (process.env.PROJECT_ENV == 'DEV') {
            if (!req.session.user) {
                console.log("rrrrrrrrrrrrrrrrrr");
                let [_users, _] = await usersModel.getById(1);
                req.session.user = _users[0] || {};
                // session = req.session;
            }
            // console.log(req.session.user);
        }

        if (req.session?.user) {
            next()
            return;
        }

        if (isGetRequest) {
            res.redirect('/auth/login')
        } else {
            return sendResponse(res, 401, false, 'Unauthorized. Kindly login')
        }
    }),

    login: asyncHandler(async (req, res) => {

        const { email, password, role } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, false, "Email and password are required");
        }

        const _users = await usersModel.getUserByEmail(email);

        if (!_users || _users[0].length === 0) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }


        let user = _users[0][0]


        if (user.password != password) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }

        const { password: _userPassword, ...userData } = user

        req.session.user = { ...userData, role }

        console.log(user)

        return sendResponse(res, 200, true, "Login successful", { user: userData });
    }),

}

module.exports = userAuthController;
