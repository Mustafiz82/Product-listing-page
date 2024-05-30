import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import Rating from "react-rating";
import { IoIosStar } from "react-icons/io";
import ProductDetailModal from "./ProductDetailModal";
const ProductList = ({ item }) => {

    console.log(item);
	const { title, image, price, rating } = item;
    

	const handleClick = (event) => {
		event.preventDefault();
		setIsTruncated(!isTruncated);
	};
	return (
		<div className="w-[80%] mx-auto  drop-shadow-lg flex justify-between flex-row-reverse items-center bg-white border  rounded-lg  text-black ">
			<img
				className="p-4 w-56 h-56
                 obj rounded-t-lg"
				src={image}
				alt={title}
			/>
			<div className="px-5 pb-5">
				<a href="#">
					<h5
						onClick={handleClick}
						className={` text-lg font-semibold tracking-tight text-gray-900 cursor-pointer transition-max-h duration-1000 `}
					>
						{title}
					</h5>
				</a>
				<div className="flex items-center mt-2.5 ">
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
				<div className="flex w-full flex-col">
					<span className="text-3xl my-2 font-bold text-blue-700 ">
						${price}
					</span>
					<a
						onClick={(e) => {
							e.preventDefault();
							showModal(item);
						}}
						href="#"
						className="btn max-w-32 btn-outline hover:bg-blue-700 hover:border-0 rounded-full text-blue-700"
					>
						View Detail
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
