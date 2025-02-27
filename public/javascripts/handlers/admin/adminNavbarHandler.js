import toast from "../../utils/toasts.js"

$(() => {


    const handleAdminLogout = async (e) => {
        e.preventDefault();

        // Disable the logout button to prevent multiple clicks
        const $button = $(e.currentTarget);
        $button.prop("disabled", true);

        try {
            const { data } = await axios.post('/api/v1/auth/logout');
            const { success, message } = data;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    window.open('/', '_self');
                }, 1000);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong');
        } finally {
            // Re-enable the logout button after the API call completes
            $button.prop("disabled", false);
        }
    };

    $(document).on("click", "#logout-btn", handleAdminLogout);

})