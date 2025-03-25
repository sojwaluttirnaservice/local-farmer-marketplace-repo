const donationsModel = require("../../models/donationsModel");
const foodCategoriesModel = require("../../models/foodCategoriesModel");
const asyncHandler = require("../../utils/asyncHandler");
const { getUser } = require("../../utils/functions");
const { renderPage } = require("../../utils/responses/ApiResponse");

const donationsViewController = {

    donations: asyncHandler(async (req, res) => {

        const [donations] = await donationsModel.getAllDonations();

        renderPage(res, 'donations/donations-list', {
            title: 'Donations',
            donations
        })
    }),



    donorsDonations: asyncHandler(async (req, res) => {

        const user = getUser(req)
        const [donations] = await donationsModel.getDonationsByDonorId(user.id)

        renderPage(res, 'donors/donors-donations', {
            title: 'Donations',
            donations,
            user
        })
    }),



    addDonation: asyncHandler(async (req, res) => {

        const user = getUser(req)
        const [foodCategories] = await foodCategoriesModel.list();

        renderPage(res, 'donations/donation-form', {
            title: 'Add donation',
            foodCategories,
            user
        })
    }),
}

module.exports = donationsViewController