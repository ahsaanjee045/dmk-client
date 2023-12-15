export const filterProducts = (
    products,
    searchTerm,
    selectedCategories,
    priceRange
) => {
    return products.filter((product) => {
        if (
            searchTerm &&
            !product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }
        // ["tshirt"] , "Pants"
        else if (
            selectedCategories.length > 0 &&
            !selectedCategories.includes(product.category.categoryName)
        ) {
            return false;
        } else if (
            product.price < priceRange[0] ||
            product.price > priceRange[1]
        ) {
            return false;
        }

        return true;
    });
};
