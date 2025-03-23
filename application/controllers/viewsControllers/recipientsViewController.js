const recipientsModel = require("../../models/recipientsModel")
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/responses/ApiResponse");

const recipientsViewController = {

    recipients: asyncHandler(async (req, res) => {

        const [recipients] = await recipientsModel.getAllRecipients();
        renderPage(res, 'recipients/recipients-list', { recipients })
    }),
}

module.exports = recipientsViewController