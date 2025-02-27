import toast from "../../utils/toasts.js";

let sampleCartData = {
    predefined_product_id_fk: 0,
    quantity: 0,
    user_id_fk: 0,
    price_at_order_time: 0,
    total_price: 0,  // Ensure total price is part of the object
};

// Returns an array of carts
function getCartDataFromLocalStorage() {
    try {
        let cartDataFromLocalStorage = localStorage.getItem("cart");
        let parsedCartData = cartDataFromLocalStorage ? JSON.parse(cartDataFromLocalStorage) : [];

        console.log("Cart from local storage:", parsedCartData);
        return parsedCartData;
    } catch (err) {
        console.error("Error:", err);
        toast.error("Error while getting data from cart");
        return [];
    }
}

// Store in local storage
function setCartDataToLocalStorage(cartData) {
    try {
        console.log("Saving cart to local storage:", cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
        return true;
    } catch (err) {
        console.error("Error:", err);
        return false;
    }
}

// Reset the cart data
function resetCartDataToLocalStorage() {
    try {
        localStorage.removeItem("cart");
        return true;
    } catch (err) {
        console.error("Error:", err);
        return false;
    }
}

// Update UI cart count (for cart icon display)
function showCartCountOnUI(cartData) {
    let itemsCount = cartData.reduce((total, item) => total + item.quantity, 0);
    let countsElements = document.querySelectorAll(".cart-items-count");
    if (countsElements)
        countsElements.forEach(cartItem => (cartItem.innerText = itemsCount));
}

// Update individual product count in UI
function updateCartWiseCountOnUI(cartData) {
    cartData.forEach(cartItem => {
        let productId = cartItem.predefined_product_id_fk;
        let targetElement = document.getElementById(`target-count_${productId}`);
        if (targetElement) targetElement.innerText = cartItem.quantity;
    });
}

// Function to add items to the cart
function addToCart(item) {
    let cartData = getCartDataFromLocalStorage();
    let existingItem = cartData.find(cartItem => cartItem.predefined_product_id_fk === item.predefined_product_id_fk);

    if (!existingItem) {
        if (item.quantity > 0) {
            item.total_price = item.price_at_order_time * item.quantity; // Correct total price calculation
            cartData.push(item);
        }
    } else {
        if (item.quantity > 0) {
            existingItem.quantity += item.quantity;
            existingItem.total_price = existingItem.price_at_order_time * existingItem.quantity; // Update total price
        } else if (existingItem.quantity > 0 && item.quantity < 0) {
            let newQuantity = existingItem.quantity + item.quantity;
            existingItem.quantity = Math.max(0, newQuantity); // Prevent negative quantity
            existingItem.total_price = existingItem.price_at_order_time * existingItem.quantity;
        }
    }

    setCartDataToLocalStorage(cartData);
    updateCartWiseCountOnUI(cartData);
    showCartCountOnUI(cartData);
}

// Load cart on page load
let cart = getCartDataFromLocalStorage();
updateCartWiseCountOnUI(cart);

export { getCartDataFromLocalStorage, setCartDataToLocalStorage, resetCartDataToLocalStorage, showCartCountOnUI };

$(() => {
    function handleAddToCart(e) {
        e.preventDefault();

        try {
            let productId = parseInt($(this).attr("data-productId"));
            let quantity = parseInt($(this).attr("data-addQuantity"));
            let pricePerUnit = parseFloat($(this).attr("data-pricePerUnit"));
            let unitOfMeasurement = $(this).attr("data-unitOfMeasurement");
            let productName = $(this).attr("data-productName");
            let productImageUrl = $(this).attr("data-productImageUrl") || "";

            let cartItem = {
                predefined_product_id_fk: productId,
                product_name: productName,
                quantity: quantity,
                price_at_order_time: pricePerUnit,
                user_id_fk: 0, // TODO: Get the user ID from session/local storage
                unit_of_measurement: unitOfMeasurement,
                total_price: pricePerUnit * quantity, // Ensure correct calculation
                img: productImageUrl,
            };

            addToCart(cartItem);
        } catch (err) {
            console.error("Error:", err);
        }
    }

    $(document).on("click", "[data-role='add-to-cart-btn']", handleAddToCart);
});
