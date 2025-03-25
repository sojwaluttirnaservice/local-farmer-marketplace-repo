import { getItem } from "../../utils/common-handler.js";
import { api } from "../../utils/instance.js";
import toast from "../../utils/toasts.js";

$(() => {
    const handleSubmitDonation = async (e) => {
        e.preventDefault();


        let user = getItem('user');

        let donationForm = document.getElementById('submit-donation-form')
        let donationData = new FormData(donationForm)
        const { _data, _error } = await api.post('/donations', donationData)

        if (_data.success) {
            toast.success(_data.message, () => {
                setTimeout(() => {
                    location.href = `/donations/u/${user.id}`
                }, 1000)
            })
        }
    }

    $(document).on('click', '#submit-donation-btn', handleSubmitDonation)
})