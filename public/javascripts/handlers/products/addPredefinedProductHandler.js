import toast from "../../utils/toasts.js";

$(() => {

    async function handleAddPredefinedProduct(e) {
        e.preventDefault();


        try {

            let predefinedProductData = new FormData(document.getElementById('add-predefined-product-form'))


            let { data } = await axios.post('/api/v1/products/p', predefinedProductData)


            let { success, message } = data;

            if (success) {
                toast.success(message)
                location.reload();
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.error(err?.response)
            toast.error(err?.response?.data?.message)
        }
    }

    $(document).on('click', '#add-predefined-product-btn', handleAddPredefinedProduct)
})