const usersModel = require("../models/usersModel")
const asyncHandler = require("../utils/asyncHandler")
const { renderPage, sendResponse } = require("../utils/responses/ApiResponse")

const usersController = {


    renderUserDashboardPage: asyncHandler(async (req, res) => {
        renderPage(res, 'users/user-dashboard.ejs', { title: 'Dashboard', user: req.session.user })
    }),


    renderUserProfilePage: asyncHandler(async (req, res) => {
        renderPage(res, 'users/user-profile.ejs', { title: 'Profile', user: req.session.user })
    }),


    renderUsersPage: asyncHandler(async (req, res) => {
        let [_usersData] = await usersModel.count();

        let [_users] = await usersModel.list();
        renderPage(res, 'users/users-list.ejs', { title: 'Users list', totalUsers: _usersData[0].total_users, users: _users })
    }),


    add: asyncHandler(async (req, res) => {

        let userDetails = req.body;

        let { name, email, mobile, address, password, confirm_password } = userDetails

        if (password && password != confirm_password) {
            return sendResponse(res, 400, false, 'Password and Confirm password do not match')
        }


        if (!name || !email || !mobile || !password) {
            return sendResponse(res, 400, false, 'Fill the required fields')
        }


        let [_existingUser, _metadata] = await usersModel.getUserByEmail(email)


        if (_existingUser?.length > 0) {
            return sendResponse(res, 409, false, 'user with Email already exists. Try another email address')
        }


        const [_result, _] = await usersModel.add(userDetails)


        if (_result.affectedRows > 0) {
            return sendResponse(res, 201, true, 'Signup successful')
        } else {
            return sendResponse(res, 400, false, 'Failed to signup')
        }
    }),


    update: asyncHandler(async (req, res) => {

        // Extract user ID and details from request
        // Assuming user ID is sent in URL
        const { name, email, mobile, address, role, status, user_type, id: userId } = req.body;

        // Check if required fields are provided
        if (!userId || !name || !email || !mobile) {
            return sendResponse(res, 400, false, "Fill all required fields");
        }

        // Check if user exists by ID
        let [_existingUser] = await usersModel.getById(userId);
        if (!_existingUser.length) {
            return sendResponse(res, 404, false, "User not found");
        }

        // Check if email is being changed & already exists for another user
        let [userWithSameEmail] = await usersModel.getUserByEmail(email);
        if (userWithSameEmail.length && userWithSameEmail[0].id !== parseInt(userId)) {
            return sendResponse(res, 409, false, "Email already in use by another user");
        }

        // Prepare updated user data
        const updatedUserData = {
            id: userId,
            name,
            email,
            mobile,
            address: address || null,
            role: role || _existingUser[0].role,
            status: status || _existingUser[0].status,
            user_type: user_type || _existingUser[0].user_type
        };

        // Perform the update
        const [_updateResult] = await usersModel.update(updatedUserData);

        if (_updateResult.affectedRows > 0) {
            return sendResponse(res, 201, true, "User details updated successfully");
        } else {
            return sendResponse(res, 400, false, "Failed to update user details");
        }
    }),
}

module.exports = usersController