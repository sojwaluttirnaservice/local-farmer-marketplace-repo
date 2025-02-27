
import toast from "../../utils/toasts.js";
// import { getCartDataFromLocalStorage } from "./cartHandler.js";


import { getCartDataFromLocalStorage, setCartDataToLocalStorage, showCartCountOnUI } from "./cartHandler.js";

$(() => {
    let carts = getCartDataFromLocalStorage();

    let cartTable = document.getElementById("cart-items-body");
    let cartTotalElement = document.getElementById("cart-total");

    // Function to display cart items
    function updateCart() {
        let total = 0;

        // Generate cart rows dynamically
        cartTable.innerHTML = carts.map((item, index) => {
            let itemTotal = +item.price_at_order_time * +item.quantity;
            total += itemTotal;

            return `
                <tr class="border-b">
                    <!-- Product Image & Name -->
                    <td class="p-4 flex items-center">
                        <img src="${item.img}" alt="${item.product_name}" class="size-12 rounded mr-4" 
                            onerror="this.src='https://i.pinimg.com/736x/9c/25/85/9c258525e4eb471d29b3c0a2c22d000b.jpg'">
                        <span class="text-gray-800 font-semibold">${item.product_name}</span>
                    </td>

                    <!-- Price per Unit -->
                    <td class="p-4 text-gray-700">₹${item.price_at_order_time}</td>

                    <!-- Quantity Input -->
                    <td class="p-4">
                        <input type="number" value="${item.quantity}" min="1"
                            class="w-16 p-2 border rounded text-center cart-quantity"
                            data-index="${index}"
                            aria-label="Update quantity for ${item.product_name}">
                    </td>

                    <!-- Subtotal -->
                    <td class="p-4 text-gray-800 font-semibold">₹${itemTotal}</td>

                    <!-- Remove Button -->
                    <td class="p-4">
                        <button class="remove-item text-red-600 hover:text-red-800 font-semibold" 
                            data-index="${index}" aria-label="Remove ${item.product_name}">
                            Remove
                        </button>
                    </td>
                </tr>
            `;
        }).join(""); // Convert array to string without commas

        // Update total price in the cart
        if (cartTotalElement)
            cartTotalElement.innerText = `₹${total}`;

        attachEventListeners(); // Attach event listeners after rendering
    }

    // Function to update quantity
    function updateQuantity(index, newQuantity) {
        newQuantity = parseInt(newQuantity);

        if (isNaN(newQuantity) || newQuantity < 1) {
            toast.error("Invalid quantity! Minimum quantity is 1.");
            return;
        }

        carts[index].quantity = newQuantity;
        carts[index].total_price = carts[index].price_at_order_time * newQuantity;

        setCartDataToLocalStorage(carts);
        showCartCountOnUI(carts);
        updateCart();
    }

    // Function to remove an item from the cart
    function removeItem(index) {
        carts.splice(index, 1); // Remove item at the given index
        setCartDataToLocalStorage(carts);
        showCartCountOnUI(carts);
        updateCart();

        toast.success("Item removed from cart!");
    }

    // Attach event listeners to inputs and buttons
    function attachEventListeners() {
        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("change", function () {
                let index = parseInt(this.dataset.index);
                updateQuantity(index, this.value);
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = parseInt(this.dataset.index);
                removeItem(index);
            });
        });
    }

    updateCart(); // Initial render
});
