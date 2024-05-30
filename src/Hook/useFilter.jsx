import React, { useState, useEffect } from 'react';

const useFilter = (initialProducts, filterConfig) => {
    const [sortedProductData, setSortedProductData] = useState([]);

    useEffect(() => {
        const searchTerm = filterConfig.searchTerm.toLowerCase();
        const sortedProduct = filterConfig.sortBy;

        let searchFiltererData = initialProducts?.filter((item) => {
            const title = item?.title.toLowerCase();
            const description = item?.description.toLowerCase();
            const price = JSON.stringify(item?.price);
            const category = item?.category.toLowerCase();

            return (
                title.includes(searchTerm) ||
                category.includes(searchTerm) ||
                description.includes(searchTerm) ||
                price.includes(searchTerm)
            );
        });

        let sortedData;
        if (sortedProduct === "default") {
            sortedData = searchFiltererData?.sort(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
        } else if (sortedProduct === "ascending") {
            sortedData = searchFiltererData?.sort(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
        } else if (sortedProduct === "descending") {
            sortedData = searchFiltererData;
        }

        setSortedProductData(sortedData);

    }, [initialProducts, filterConfig]);


    console.log(sortedProductData);

    return sortedProductData;
};

export default useFilter;
