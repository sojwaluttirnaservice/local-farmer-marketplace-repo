import { getItem } from "../../utils/common-handler.js";
import { api } from "../../utils/instance.js";
import toast from "../../utils/toasts.js";

$(() => {
    const handleSubmitRequest = async (e) => {
        e.preventDefault();


        let user = getItem('user');

        let requestForm = document.getElementById('submit-request-form')
        let requestData = new FormData(requestForm)
        const { _data, _error } = await api.post('/requests', requestData)

        if (_data.success) {
            toast.success(_data.message, () => {
                setTimeout(() => {
                    location.href = `/requests/u/${user.id}`
                }, 1000)
            })
        }
    }

    $(document).on('click', '#submit-request-btn', handleSubmitRequest)
})