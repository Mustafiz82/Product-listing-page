import React, { useState, useEffect } from 'react';

const useFilter = (initialProducts, filterConfig ) => {
    const [sortedProductData, setSortedProductData] = useState([]);

    useEffect(() => {
        const searchTerm = filterConfig.searchTerm.toLowerCase();
        const categories = filterConfig.category
        const sortedProduct = filterConfig.sortBy;
        const priceLowest = filterConfig.priceLowest
        const priceHighest = filterConfig.priceHighest


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


      
        const categoriesLowerCase = categories?.map(item => item?.toLowerCase())

        let categoryFiltererData = searchFiltererData?.filter(item => {
            return categoriesLowerCase.includes(item?.category.toLowerCase())
        })


        let priceFilterData = categoryFiltererData?.filter(item => {
        return  item?.price  > priceLowest  && item?.price < priceHighest

        }) 





        let sortedData;
        if (sortedProduct === "default") {
            sortedData = priceFilterData?.sort(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
        } else if (sortedProduct === "ascending") {
            sortedData = priceFilterData?.sort(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
        } else if (sortedProduct === "descending") {
            sortedData = priceFilterData;
        }

        setSortedProductData(sortedData);

    }, [initialProducts, filterConfig]);


    // console.log(sortedProductData);

    return sortedProductData;
};

export default useFilter;
