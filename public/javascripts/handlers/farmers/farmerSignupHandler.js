import toast from "../../utils/toasts.js"

$(() => {


    async function handleFarmerSignup(e) {
        e.preventDefault();

        try {


            let form = document.getElementById('farmer-signup-form')
            let farmerData = new FormData()


            const { data } = await axios.post('/api/v1/farmers/signup', farmerData)

            const { success, message } = data


            if (success) {
                toast.success(message)
                form.reset();
            } else {
                toast.error(message)
            }

        } catch (err) {

            console.error(err);
            toast.error(err?.response?.data?.message)

        }
    }

    $(document).on('click', '#farmer-signup-btn', handleFarmerSignup)
})