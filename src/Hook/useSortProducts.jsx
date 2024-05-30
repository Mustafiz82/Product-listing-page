import { useState, useEffect } from "react";

const useSortProducts = (products , ) => {
    const [sortedProduct, setSortedProduct] = useState("default");
    const [sortedProductData, setSortedProductData] = useState([]);

    // console.log(searchTerm , "from hook ");

    useEffect(() => {
        if (products) {
            setSortedProductData(products);
        }
    }, [products]);

    const handleSort = () => {
        console.log(sortedProduct, "sortedProduct from function");

        if (sortedProduct === "default") {
            const ascendingSortedProduct = [...products].sort(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)

            );
            setSortedProductData(ascendingSortedProduct);
            setSortedProduct("ascending");
            console.log("sorted by ascending");
        } else if (sortedProduct === "ascending") {
            const descendingSortedProduct = [...products].sort(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
            setSortedProductData(descendingSortedProduct);
            setSortedProduct("descending");
            console.log("sorted by descending");
        } else if (sortedProduct === "descending") {
            setSortedProduct("default");
            setSortedProductData(products);
            console.log("reset to default");
        }
    };

    // setDisplayProducts(sortedProductData)

    return { sortedProduct, sortedProductData, handleSort , setSortedProductData };
};

export default useSortProducts;
