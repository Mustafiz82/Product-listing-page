
const useSearchProducts = (initialProducts , setSortedProductData , sortedProduct) => {

  

  const handleSearch = (searchTerm ) => {
    const searchFiltererData = initialProducts.filter((item) => {
      const title = item?.title.toLowerCase();
      const description = item?.description.toLowerCase();
      const price = JSON.stringify(item?.price);
      const category = item?.category.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return (
        title.includes(searchTermLower) ||
        category.includes(searchTermLower) ||
        description.includes(searchTermLower) ||
        price.includes(searchTermLower)
      );
    });

    setSortedProductData(searchFiltererData);
  };

  return {handleSearch };
};

export default useSearchProducts;
