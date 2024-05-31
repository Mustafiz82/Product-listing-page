import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import Product from "./Components/Product";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import ProductDetailModal from "./Components/ProductDetailModal";
import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProductList from "./Components/ProductList";
import { TbArrowsSort } from "react-icons/tb";
import useSortProducts from "./Hook/useSortProducts";
import useSearchProducts from "./Hook/useSearchProducts";
import useFilter from "./Hook/useFilter";

function App() {

	// Fetching data from FakeStore Api
	const {
		isLoading,
		error,
		data: products,
	} = useQuery({
		queryKey: ["products"],
		queryFn: () => {
			return axios
				.get("https://fakestoreapi.com/products")
				.then((item) => item?.data);
		},
	});
		const [category , setCategory] = useState([])

	const [checkedCategories, setCheckedCategories] = useState([]);
	const [lowestPrice , setLowestPrice] = useState(0)
	const [productsCategories , setProductCategories] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState("")
	const [searchTerm, setSearchTerm] = useState("");
	const [layout, setLayout] = useState("grid");
	const [filterConfig, setFilterConfig] = useState({
		sortBy: "descending",//filter hook will convert it & render data in default mood.
		searchTerm: "",
		category:  category,
		priceLowest: 0,
		priceHighest: 5000,

	});

	// console.log(lowestPrice);

	// console.log(category,"cat3egory");
	

	
		const categoryList =  new Set(products?.map(product => product.category.toUpperCase()))
	useEffect(()=> {
		if(products){

			const productCategory = products?.map(item => item?.category)
			// console.log(categoryList);
			setCategory(categoryList)
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				category: [...categoryList]
			}))
			setCheckedCategories([...categoryList])
			setProductCategories(productCategory)
			}


	},[products])




	

	// console.log(category , "category");




	// console.log(filterConfig, "filtercongi");

	
	
	const filterProduct = useFilter(products , filterConfig , setFilterConfig)


	if (error) return <div>Error: {error.message}</div>;

	// const { sortedProduct, sortedProductData, handleSort , setSortedProductData} = useSortProducts(products , searchTerm);

	// const { handleSearch } = useSearchProducts(products , setSortedProductData , sortedProduct);



	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleSearchChange = (e) => {
		// handleSearch(e.target.value);

		////////////////////////////////////////////////////////

		setFilterConfig((prevConfig) => ({
			...prevConfig,
			searchTerm: e.target.value,
		category:  [...categoryList],
		priceLowest: 0,
		priceHighest: 5000,
		}));
		// ///////////////////////////////////////

		setSearchTerm(e.target.value);
		
	};

	const handleSort = () => {
		// console.log(filterConfig.sortBy);
		if (filterConfig.sortBy == "default") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "ascending",
			}));
		}
		else if (filterConfig.sortBy == "ascending") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "descending",
			}));
		}
		else if (filterConfig.sortBy == "descending") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "default",
			}));
		}
		
		
	};



	// useEffect(() => {
	// 	products.filter(item => {

	// 	})
	// },[])

	const handleCategory = (item ) =>{
		// console.log(item,"itemeeeeeeeeeeeeeeee");
		setSelectedCategory(item)

	}

	// console.log("checkedcategories" ,checkedCategories);
	const handleCheckboxChange = (event) => {
		const { id, checked } = event.target;

	  
		// console.log(id, checked);
		if (id && checked) {
		  console.log(id, checked);
	  
		  setCheckedCategories((prevCheckedCategories) => {
			const updatedCategories = [...prevCheckedCategories, id];
			setFilterConfig((prevConfig) => ({
			  ...prevConfig,
			  category: updatedCategories,
			}));
			return updatedCategories;
		  });
		} else {
		  setCheckedCategories((prevCheckedCategories) => {
			const updatedCategories = prevCheckedCategories.filter(category => category !== id);
			setFilterConfig((prevConfig) => ({
			  ...prevConfig,
			  category: updatedCategories,
			}));
			return updatedCategories;
		  });
		}
	  };

	  const handleSubmitPrice = (e) => {
		e.preventDefault()
		const priceHighest = e.target.highest_price.value
		const priceLowest = e.target.lowest_price.value
		setFilterConfig((prevConfig) => ({
			...prevConfig,
			priceHighest: priceHighest,
			priceLowest: priceLowest,
		  }));
		// console.log(  priceLowest , priceHighest );
	  }
	  

	const showModal = (product) => {
		setSelectedProduct(product);
		const modal = document.getElementById("product-detail");
		if (modal) {
			modal.showModal();
		} else {
			console.error("Modal element not found");
		}
	};


	return (
		<div className="bg-image">
			{/* Header section  */}
			<div className="flex   gap-5 px-14 py-10">
				<label className="border-[1px] p-2 rounded-lg   flex-grow input-bordered border-blue-700 px-8 flex items-center gap-2">
					<IoSearch />
					<input
						onChange={handleSearchChange}
						type="text"
						className="grow bg-transparent outline-none"
						placeholder="Search Products"
					/>
				</label>

				{/* Sort button */}

				<div
					onClick={handleSort}
					className="flex  justify-center items-center gap-2 input input-bordered"
				>
					Sort by{" "}
					{filterConfig.sortBy == "descending" ? (
						<FaArrowDownLong />
					) : filterConfig.sortBy == "ascending" ? (
						<FaArrowUpLong />
					) : (
						<TbArrowsSort />
					)}
				</div>

				{/* Layout changing Button */}
				<div className="join text-2xl ">
					<span
						onClick={() => {
							setLayout("grid");
						}}
						className={` ${
							layout == "grid" ? "bg-[#D1C4E9] text-blue-700" : ""
						}   join-item btn`}
					>
						<BsGridFill className="text-xl  bg-" />
					</span>
					<span
						onClick={() => {
							setLayout("List");
						}}
						className={` ${
							layout == "grid" ? "" : "bg-[#D1C4E9] text-blue-700"
						}   join-item btn`}
					>
						<FaList className="text-xl " />
					</span>
				</div>
			</div>

			{/* product Section */}

			<div className="flex ">
				{/* Category section */}
				<div className="w-1/4 pl-10 pt-0 ">
					

					<h1 className="text-2xl  px-4 font-medium">
						Filter From
					</h1>

					<form onSubmit={handleSubmitPrice} className="flex mt-5 px-4 items-center gap-4">
						<input onChange={(e) => setLowestPrice(e.target.value)}
							type="number"
							className="input bg-transparent border-black input-bordered w-full  " 
							name="lowest_price"
							placeholder="$ From"
							min={0}
							
						/>
						<span className="font-bold">-</span>
						<input
							type="number"
							className="input  bg-transparent border-black input-bordered w-full  "
							name="highest_price"
							placeholder="$ To"
							min={lowestPrice}

						/>
						<button type="submit" className="btn btn-primary">
							{" "}
							<MdOutlineArrowForwardIos />
						</button>
					</form>
					<h1 className="text-2xl mt-8 px-4 font-medium">
						Filter Check
					</h1>

					<div className="text-base mt-5 font-normal text-black ">
						
						{
							[...category]?.map((item , index) =><label key={index}  
								htmlFor={item}
								className="py-2 px-4 flex justify-between items-center"
							>
								<label className="flex gap-2">
									<input
										type="checkbox"
										id={item}
										className="checkbox rounded-none checkbox-sm checkbox-primary"
										defaultChecked
										onChange={handleCheckboxChange}

									/>
									<h2 className=" "> {item}</h2>
								</label>
							</label> )
						}
						
					</div>
				</div>

				{/* product viewing section */}
				<div className="mx-5 w-3/4">
					{layout == "grid" ? (
						<div className="grid  grid-cols-3 gap-5">
							{filterProduct?.map((product) => (
								<Product
									key={product.id}
									item={product}
									showModal={showModal}
								/>
							))}
							<ProductDetailModal
								item={selectedProduct || products[0]}
							/>
						</div>
					) : (
						<div className="space-y-4">
							{filterProduct?.map((product) => (
								<ProductList
									key={product.id}
									item={product}
									showModal={showModal}
								></ProductList>
							))}
							<ProductDetailModal
								item={selectedProduct || products[0]}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
