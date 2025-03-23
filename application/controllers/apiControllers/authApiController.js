const asyncHandler = require("../../utils/asyncHandler");
const { sendError, sendResponse } = require("../../utils/responses/ApiResponse");
const { FAILURE, SUCCESS } = require("../../utils/responses/executionCodes");

const donorsModel = require("../../models/donorsModel");
const recipientsModel = require("../../models/recipientsModel");
const adminModel = require("../../models/adminModel");


const authApiController = {

    loginAdmin: asyncHandler(async (req, res) => {


        console.log(req.body)
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, 'Email and password required')
        }


        const [existing] = await adminModel.getAdminByEmail(email)

        console.log(existing)

        if (!existing?.length || existing[0]?.password != password) {
            return sendError(res, 400, FAILURE, 'Invalid credentials')
        }



        let { password: pass, ...admin } = existing[0]

        return sendResponse(res, 200, SUCCESS, 'Login Successful', { admin })

    }),

    registerDonor: asyncHandler(async (req, res) => {
        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return sendError(res, 400, FAILURE, "All fields are required");
        }

        const existingDonor = await donorsModel.findOne({ where: { email } });
        if (existingDonor) {
            return sendError(res, 400, FAILURE, "Donor already exists");
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const newDonor = await donorsModel.create({ name, email, password: '', mobile });

        return sendResponse(res, 201, SUCCESS, "Donor registered successfully", newDonor);
    }),

    loginDonor: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, "Email and password are required");
        }

        const donor = await donorsModel.findOne({ where: { email } });
        if (!donor) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        // const isMatch = await bcrypt.compare(password, donor.password);
        let isMatch = true
        if (!isMatch) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        // const token = jwt.sign({ id: donor.id, email: donor.email }, config.JWT_SECRET, { expiresIn: "1d" });

        return sendResponse(res, 200, SUCCESS, "Login successful",);
    }),

    registerRecipient: asyncHandler(async (req, res) => {
        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return sendError(res, 400, FAILURE, "All fields are required");
        }

        const existingRecipient = await recipientsModel.findOne({ where: { email } });
        if (existingRecipient) {
            return sendError(res, 400, FAILURE, "Recipient already exists");
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const newRecipient = await recipientsModel.create({ name, email, password: 'hashedPassword', mobile });

        return sendResponse(res, 201, SUCCESS, "Recipient registered successfully", newRecipient);
    }),

    loginRecipient: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, FAILURE, "Email and password are required");
        }

        const recipient = await recipientsModel.findOne({ where: { email } });
        if (!recipient) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        // const isMatch = await bcrypt.compare(password, recipient.password);
        let isMatch = true
        if (!isMatch) {
            return sendError(res, 401, FAILURE, "Invalid credentials");
        }

        // const token = jwt.sign({ id: recipient.id, email: recipient.email }, config.JWT_SECRET, { expiresIn: "1d" });

        return sendResponse(res, 200, SUCCESS, "Login successful", {});
    }),
};

module.exports = authApiController;
