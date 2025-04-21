const asyncHandler = require("../../utils/asyncHandler");
const { sendError, sendResponse } = require("../../utils/responses/ApiResponse");
const { FAILURE, SUCCESS } = require("../../utils/responses/executionCodes");

const donorsModel = require("../../models/donorsModel");
const recipientsModel = require("../../models/recipientsModel");
const adminModel = require("../../models/adminModel");


const authApiController = {

    loginAdmin: asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, 'Email and password required')
        }


        const [existing] = await adminModel.getAdminByEmail(email)

        // console.log(existing)

        if (!existing?.length || existing[0]?.password != password) {
            return sendError(res, 400, FAILURE, 'Invalid credentials')
        }

        let { password: pass, ...admin } = existing[0]

        admin.role = 'admin'
        req.session.user = admin

        return sendResponse(res, 200, SUCCESS, 'Login Successful', { user: admin })

    }),

    registerDonor: asyncHandler(async (req, res) => {
        const { name, email, password, confirm_password, mobile, address } = req.body;

        if (!name || !email || !password || !mobile || !address) {
            return sendError(res, 400, FAILURE, "All fields are required");
        }

        if (password != confirm_password) {
            return sendError(res, 400, FAILURE, 'Password & Confirm Password not matchin')
        }

        const [donors] = await donorsModel.getByEmail(email);
        if (donors?.length) {
            return sendError(res, 400, FAILURE, `Donor with ${email} already exists`);
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        // const newDonor = await donorsModel.create({ name, email, password: '', mobile });

        const [saveResult] = await donorsModel.addDonor(req.body)

        if (saveResult.affectedRows > 0)
            return sendResponse(res, 201, SUCCESS, "Donor registered successfully");
    }),

    loginDonor: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, "Email and password are required");
        }

        const [donors] = await donorsModel.getByEmail(email)
        if (!donors?.length) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        let { password: pass, ...donor } = donors[0]
        let isMatch = password == pass
        if (!isMatch) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }
        donor.role = 'donor'
        // Adding donor to the session in user object with donor role
        req.session.user = donor

        return sendResponse(res, 200, SUCCESS, "Login successful", { user: donor });
    }),

    registerRecipient: asyncHandler(async (req, res) => {
        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return sendError(res, 400, FAILURE, "All fields are required");
        }

        const [recipients] = await recipientsModel.getByEmail(email);
        if (recipients?.length) {
            return sendError(res, 400, FAILURE, `Recipient with ${email} already exists`);
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        // const newRecipient = await recipientsModel.create({ name, email, password: 'hashedPassword', mobile });

        const [saveResult] = await recipientsModel.createRecipient(req.body)

        if (saveResult.affectedRows > 0)
            return sendResponse(res, 201, SUCCESS, "Recipient registered successfully",);
    }),

    loginRecipient: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, "Email and password are required");
        }
        const [recipients] = await recipientsModel.getByEmail(email)
        if (!recipients?.length) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        let { password: pass, ...recipient } = recipients[0]
        let isMatch = password == pass

        if (!isMatch) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        recipient.role = 'recipient'
        // Adding donor to the session in user object with donor role
        req.session.user = recipient

        return sendResponse(res, 200, SUCCESS, "Login successful", { user: recipient });
    }),
};

module.exports = authApiController;
