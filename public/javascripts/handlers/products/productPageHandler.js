import toast from "../../utils/toasts.js";

// HANDLER FOR THE SPECIFIC PRODUCT PAGE ONLY
$(() => {
    let categoriesCount = parseInt($('#filters-list').attr('data-totalCategories'));
    let selectedCategories = new Set(); // Using Set for unique selections

    function handleSelectFilter(e) {
        e.preventDefault();

        let selectedCategory = $(this).attr('data-category');
        let isChecked = $(this).is(':checked');

        // Add or remove category from Set
        if (isChecked) {
            selectedCategories.add(selectedCategory);
        } else {
            selectedCategories.delete(selectedCategory);
        }

        // Case 1: Show all products if no category is selected or all are selected
        if (selectedCategories.size === 0 || selectedCategories.size === categoriesCount) {
            $("#products-list li").fadeIn(200);
            return;
        }

        // Case 2: Show only selected categories, hide others
        $("#products-list li").each(function () {
            let productCategory = $(this).attr("data-productCategory");
            if (selectedCategories.has(productCategory)) {
                $(this).fadeIn(200);
            } else {
                $(this).fadeOut(200);
            }
        });
    }
    // Event listener for category filter checkboxes
    $(document).on("change", "[data-role='category-filter-checkbox']", handleSelectFilter);
});
