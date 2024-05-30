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
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [layout, setLayout] = useState("grid");
	const [filterConfig, setFilterConfig] = useState({
		sortBy: "descending",//filter hook will convert it & render data in default mood.
		searchTerm: "",
		category: "all",
		priceLowest: 0,
		priceHighest: 5000,
	});

	console.log(filterConfig, "filtercongi");

	const showModal = (product) => {
		setSelectedProduct(product);
		const modal = document.getElementById("product-detail");
		if (modal) {
			modal.showModal();
		} else {
			console.error("Modal element not found");
		}
	};

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

	const filterProduct = useFilter(products , filterConfig)


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
		}));
		// ///////////////////////////////////////

		setSearchTerm(e.target.value);
	};

	const handleSort = () => {
		console.log(filterConfig.sortBy);
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
				<div className="w-1/4 pl-10 pt-2 ">
					<h1 className="text-2xl px-4 font-medium">
						{" "}
						chose category{" "}
					</h1>
					<div className="text-base mt-5 font-normal text-black ">
						<div className="py-2 px-4 flex justify-between items-center">
							<h2 className=" ">All Category</h2>
							<p>05</p>
						</div>
						<div className="py-2 px-4 flex justify-between items-center">
							<h2 className="">jewelry</h2>
							<p>05</p>
						</div>
						<div className="py-2 bg-blue-700 text-white  rounded-full px-4 flex justify-between items-center">
							<h2 className="  ">Men's clothing</h2> <p>05</p>
						</div>
						<div className="py-2 px-4 flex justify-between items-center">
							<h2 className="">Women's clothing</h2>
							<p>05</p>
						</div>
						<div className="py-2 px-4 flex justify-between items-center">
							<h2 className="">Electronics</h2>
							<p>05</p>
						</div>
					</div>

					<h1 className="text-2xl mt-8 px-4 font-medium">
						Filter From
					</h1>

					<div className="flex mt-5 px-4 items-center gap-4">
						<input
							type="number"
							className="input bg-transparent border-black input-bordered w-full  "
							placeholder="$ From"
						/>
						<span className="font-bold">-</span>
						<input
							type="number"
							className="input  bg-transparent border-black input-bordered w-full  "
							placeholder="$ To"
						/>
						<button className="btn btn-primary">
							{" "}
							<MdOutlineArrowForwardIos />
						</button>
					</div>
					<h1 className="text-2xl mt-8 px-4 font-medium">
						Filter Check
					</h1>

					<div className="text-base mt-5 font-normal text-black ">
						<label
							for="All-category"
							className="py-2 px-4 flex justify-between items-center"
						>
							<div for="All-category" className="flex gap-2">
								<input
									type="checkbox"
									defaultChecked
									id="All-category"
									className="checkbox rounded-none checkbox-sm checkbox-primary"
								/>
								<h2 className=" "> All Category</h2>
							</div>
							<p>05</p>
						</label>
						<label
							for="jewelry"
							className="py-2 px-4 flex justify-between items-center"
						>
							<label className="flex gap-2">
								<input
									type="checkbox"
									id="jewelry"
									className="checkbox rounded-none checkbox-sm checkbox-primary"
								/>
								<h2 className=" "> jewelry</h2>
							</label>
							<p>05</p>
						</label>
						<label
							for="men's-clothing"
							className="py-2 px-4 flex justify-between items-center"
						>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="men's-clothing"
									className="checkbox rounded-none checkbox-sm checkbox-primary"
								/>
								<h2 className=" "> Men's clothing</h2>
							</div>
							<p>05</p>
						</label>
						<label
							for="women's-clothing"
							className="py-2 px-4 flex justify-between items-center"
						>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="women's-clothing"
									className="checkbox rounded-none checkbox-sm checkbox-primary"
								/>
								<h2 className=" "> Women's clothing</h2>
							</div>
							<p>05</p>
						</label>
						<label
							for="Electronics"
							className="py-2 px-4 flex justify-between items-center"
						>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="Electronics"
									className="checkbox rounded-none checkbox-sm checkbox-primary"
								/>
								<h2 className=" ">Electronics </h2>
							</div>
							<p>05</p>
						</label>
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
