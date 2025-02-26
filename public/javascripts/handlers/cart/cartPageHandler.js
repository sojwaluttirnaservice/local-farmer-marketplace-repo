import toast from "../../utils/toasts.js";
import { getCartDataFromLocalStorage } from "./cartHandler.js";

$(() => {
    let carts = getCartDataFromLocalStorage();

    // Function to display cart items
    function updateCart() {
        let cartTable = document.getElementById('cart-items-body');
        let total = 0;

        // Generate cart rows using map()
        let cartRows = carts.map((item, index) => {
            let itemTotal = item.price_per_unit * item.count;
            total += itemTotal;

            return `
                <tr class="border-b">
                    <td class="p-4 flex items-center">
                        <img  src="${item.img}" alt="${item.product_name}" class="size-12 rounded mr-4" onerror="this.src='https://i.pinimg.com/736x/9c/25/85/9c258525e4eb471d29b3c0a2c22d000b.jpg'">
                        ${item.product_name}
                    </td>
                    <td class="p-4">$${item.price_per_unit}</td>
                    <td class="p-4">
                        <input type="number" value="${item.count}" min="1"
                            class="w-16 p-2 border rounded"
                            onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td class="p-4">$${itemTotal.toFixed(2)}</td>
                    <td class="p-4">
                        <button onclick="removeItem(${index})"
                            class="text-red-600 hover:text-red-800">Remove</button>
                    </td>
                </tr>
            `;
        }).join(""); // Convert array to string without commas

        cartTable.innerHTML = cartRows; // Insert mapped HTML into the table

        // Update total price in the cart
        // document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
    }

    updateCart();
});
