import toast from "../../utils/toasts.js"

$(() => {

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/auth/logout')

            let { success, message } = data;

            if (success) {
                toast.success(message);
                setTimeout(() => {
                    window.open('/')
                }, 500)
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.response?.data?.message || "Something went wrong")
        }
    }
    
    $(document).on('click', "[data-role='user-logout-btn']", handleLogout);
})