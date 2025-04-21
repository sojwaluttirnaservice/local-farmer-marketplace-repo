import { api } from "../../utils/instance.js"
import toast from "../../utils/toasts.js"

$(() => {



    const handleUpdateRequestStatus = async (request_id, status, food_category_id, quantity) => {


        const { _data, _error } = await api.put('/requests/status', {
            request_id,
            status,
            quantity,
            food_category_id
        })

        if (_data?.success) {
            toast.success(_data.message, () => {
                setTimeout(() => {
                    location.reload()
                }, 1000)
            })
        }
    }

    $('button[data-button="accept-request-btn"]').on('click', function () {

        // Get the value of the 'data-request' attribute of the clicked button
        let requestData = $(this).attr('data-request');

        // Parse the JSON string into a JavaScript object
        let parsedRequest = JSON.parse(requestData);

        let { id: request_id, food_category_id, quantity } = parsedRequest

        // Optionally, do something with parsedRequest, like passing it to a function
        // For example: updateRequestStatus(parsedRequest);
        handleUpdateRequestStatus(request_id, 'approved', food_category_id, quantity)
    });

    $('button[data-button="reject-request-btn"]').on('click', function () {

        // Get the value of the 'data-request' attribute of the clicked button
        let requestData = $(this).attr('data-request');

        // Parse the JSON string into a JavaScript object
        let parsedRequest = JSON.parse(requestData);

        let { id: request_id, food_category_id, quantity } = parsedRequest

        // Optionally, do something with parsedRequest, like passing it to a function
        // For example: updateRequestStatus(parsedRequest);
        handleUpdateRequestStatus(request_id, 'rejected', food_category_id, quantity)
    });
})