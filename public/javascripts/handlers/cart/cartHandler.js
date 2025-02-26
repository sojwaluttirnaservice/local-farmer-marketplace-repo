import toast from "../../utils/toasts.js"

let sampleCartData = {
    predefined_product_id_fk: 0,
    count: 0,
    user_id_fk: 0,
    price_per_unit: 0,
}

// Returns an array of carts
function getCartDataFromLocalStorage() {
    try {


        let cartDataFromLocalStorage = localStorage.getItem('cart');

        let parsedCartData = []
        if (cartDataFromLocalStorage) {
            parsedCartData = JSON.parse(cartDataFromLocalStorage)
        }
        console.log("Cart from the local storage");
        console.log(parsedCartData);
        return parsedCartData

    } catch (err) {
        console.error('Error:', err);
        toast.error('Error while getting data from cart')
    }
}

// Store in the lcoalstorage
function setCartDataToLocalStorage(cartData) {
    try {
        console.log("Cart from the local storage");
        console.log(cartData);
        localStorage.setItem('cart', JSON.stringify(cartData));
        return true;
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
}


function resetCartDataToLocalStorage(cartData) {
    try {
        localStorage.removeItem('cart');
        return true;
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
}



function showCartCountOnUI(cartData) {
    let itemsCount = 0;
    cartData?.forEach(item => itemsCount += item.count);
    document.querySelectorAll('.cart-items-count')
        ?.forEach(cartItem => cartItem.innerText = itemsCount)
}

function updateCartWiseCountOnUI(cartData) {

    cartData?.forEach(cartItem => {
        let itemCount = cartItem.count;
        let productId = cartItem.predefined_product_id_fk;

        let targetElementId = `target-count_${productId}`;

        let cartCountElement = document.getElementById(targetElementId)

        if (cartCountElement)
            cartCountElement.innerText = itemCount
    })
}

function addToCart(item) {
    let cartData = getCartDataFromLocalStorage();

    let existingItem = cartData.find(cartItem => cartItem.predefined_product_id_fk === item.predefined_product_id_fk);

    if (!existingItem) {
        // IF IT IS MEANT FOR ADDING ONLY THEN PUSH IT ELSE DO NOTHING LOL
        if (item.count > 0)
            cartData.push(item);

    } else {
        // IF IT IS ADD CASE THEN SIMPLY INCREASE EXISTING COUNT
        if (item.count > 0) {
            existingItem.count += item.count;
        } else if (existingItem.count > 0 && item.count < 0) {
            existingItem.count += item.count;
        }
    }
    setCartDataToLocalStorage(cartData);
    updateCartWiseCountOnUI(cartData);
    showCartCountOnUI(cartData);
}

// STORING THE DATA IN THE LOCAL STORAGE FOR THE CART
let cart = getCartDataFromLocalStorage();
updateCartWiseCountOnUI(cart)

export { getCartDataFromLocalStorage, setCartDataToLocalStorage, resetCartDataToLocalStorage }

$(() => {


    // Add event listener to the add to cart button


    function handleAddToCart(e) {
        e.preventDefault();

        try {
            let productId = $(this).attr('data-productId')
            let addQuantity = $(this).attr('data-addQuantity');

            let predefinedProductId = parseInt(productId);
            let count = parseInt(addQuantity)

            let pricePerUnit = parseFloat($(this).attr('data-pricePerUnit'));
            let unitOfMeasurement = $(this).attr('data-unitOfMeasurement')

            let productName = $(this).attr('data-productName')
            let productImageUrl = $(this).attr('data-productImageUrl') || ''

            let cartItem = {
                predefined_product_id_fk: predefinedProductId,
                count: count,
                user_id_fk: 0, // TODO: Get the user id from the local storage
                price_per_unit: pricePerUnit,
                unit_of_measurement: unitOfMeasurement,
                product_name: productName,
                img: productImageUrl
            }

            addToCart(cartItem)
        } catch (err) {
            console.error('Error:', err);
        }
    }

    $(document).on('click', "[data-role='add-to-cart-btn']", handleAddToCart)
})


// THE BELOW FUNCTION SAVES THE DATA TO THE BACKEDN IN DB

// // Build this
// async function handleAddToCart(e) {
//     e.preventDefault();

//     try {


//         const { data } = await axios.post('/api/v1/cart')

//         let { success, message } = data;


//         if (success) {
//             toast.success(message)
//         } else {
//             toast.error(message)
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         let resData = err?.response?.data
//         if (resData) {
//             let { statusCode, message } = resData
//             if (statusCode == '401') {
//                 // Asking to kindly login
//                 toast.error("Login first to add to the cart")
//             } else {
//                 toast.error(message)
//             }
//         } else {
//             toast.error('Unable to add to the cart')
//         }
//     }
// }