import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import Rating from "react-rating";
import { IoIosStar } from "react-icons/io";
import ProductDetailModal from "./ProductDetailModal";

const ProductList = ({ item , showModal }) => {

	const { title, image, price, rating } = item;
    
	const [isTruncated, setIsTruncated] = useState(true);

	const handleClick = (event) => {
		event.preventDefault();
		setIsTruncated(!isTruncated);
	};
	return (
		<div className="lg:w-[80%] py-5 mx-auto  drop-shadow-lg flex justify-between flex-row-reverse items-center bg-white border  rounded-lg  text-black ">
			<div className="w-1/3 flex justify-center items-center md:w-56  h-56">
			<img
				className="p-4 md:h-full 
                 obj rounded-t-lg"
				src={image}
				alt={title}
			/>
			</div>
			<div className="w-2/3  px-5 space-y-2 lg:pb-5">
				<a href="#">
				<h5
						onClick={handleClick}
						className={`text-left overflow-hidden text-lg font-semibold tracking-tight text-gray-900 cursor-pointer ${
							isTruncated ? "truncate max-h-10" : "max-h-full"
						} transition-max-h duration-1000 `}
					>
						{title}
					</h5>
				</a>
				<div className="flex  items-center mt-2.5 ">
					<div className="flex items-center gap-2">
						<Rating
							readonly
							placeholderRating={rating?.rate}
							emptySymbol={
								<IoStarOutline className="text-amber-400" />
							}
							placeholderSymbol={
								<IoIosStar className="text-amber-400" />
							}
							fullSymbol={
								<IoIosStar className="text-amber-400" />
							}
						/>{" "}
						<div className="">
							{`(`}
							{rating?.count}
							{`)`}
						</div>
					</div>
				</div>
				<div className="flex gap-2 w-full flex-col">
					<span className="text-3xl my-2 font-bold text-blue-700 ">
						${price}
					</span>
					<a
						onClick={(e) => {
							e.preventDefault();
							showModal(item);
						}}
						href="#"
						className="btn max-w-32 btn-outline hover:text-white hover:bg-blue-700 hover:border-0  text-blue-700"
					>
						View Detail
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
