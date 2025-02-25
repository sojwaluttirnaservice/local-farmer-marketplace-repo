import toast from "../../utils/toasts.js";

$(() => {


    function calculateSaleAmount(e) {

        let selectedOption = $("[name='predefined_product_id_fk']").find('option:selected')

        // Get pricer perr unit
        let pricePerUnit = +selectedOption.attr('data-pricePerUnit') || 0;
        // unit of measuremnet
        let unitOfMeasurement = selectedOption.attr('data-unitOfMeasurement')


        $("[name='unit_of_measurement']").val(unitOfMeasurement)
        $("[name='price_per_unit_at_transaction']").val(pricePerUnit)


        // Get quantity of the product

        let stockQuantity = +$("[name='stock_quantity']").val() || 0;

        let salesAmount = stockQuantity * pricePerUnit
        $("[name='sale_amount']").val(salesAmount.toFixed(2))
    }

    $(document).on('input',
        "[name='predefined_product_id_fk'], [name='stock_quantity']",
        calculateSaleAmount);





    async function handleAddSale(e) {
        e.preventDefault();

        let form = document.getElementById('add-sale-form')

        const saleData = new FormData(form)

        try {

            let { data } = await axios.post('/api/v1/sales', saleData)

            let { success, message } = data;

            if (success) {
                toast.success(message);
                form.reset()
            } else {
                toast.error(message);  // handle error
            }

        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.response?.data?.message) || 'Unable to add the sale'
        }
    }

    $(document).on('click', '#add-sale-btn', handleAddSale)
})