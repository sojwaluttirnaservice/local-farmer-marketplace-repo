import toast from "../../utils/toasts.js"



$(() => {



    async function handleUserSignup(e) {
        e.preventDefault();


        try {

            let form = document.getElementById('user-form')

            let userData = new FormData(form)

            const { data } = await axios.post('/api/v1/users', userData);

            let { success, message } = data;

            if (success) {
                toast.success(message);
                setTimeout(() => window.open('/auth/login'), 1000)
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.response?.data?.message || 'Unknown error')
        }
    }
    
    $(document).on('click', '#user-signup-btn', handleUserSignup)

})