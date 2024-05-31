import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import Rating from "react-rating";
import { IoIosStar } from "react-icons/io";

const Product = ({ item, showModal }) => {
	const { title, image, price, rating } = item;
	const [isTruncated, setIsTruncated] = useState(true);

	// This function Allows to view text which are cut of due ot width limitation
	const handleClick = (event) => {
		event.preventDefault();
		setIsTruncated(!isTruncated);
	};

	return (
		<div className="w-full flex flex-col justify-between bg-white border  rounded-lg  text-black ">
			<div className="w-80  relative h-80 mx-auto ">
				<img
					className="p-8  absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 max-h-full mx-auto  overflow-hidden rounded-t-lg"
					src={image}
					alt={title}
				/>	
			</div>

			<div className="px-5 pb-5">
				<a href="#">
					<h5
						onClick={handleClick}
						className={`overflow-hidden text-lg font-semibold tracking-tight text-gray-900 cursor-pointer ${
							isTruncated ? "truncate max-h-10" : "max-h-full"
						} transition-max-h duration-1000 `}
					>
						{title}
					</h5>
				</a>
				<div className="flex items-center mt-2.5 mb-5">
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
						<div className="-mt-1">
							{`(`}
							{rating?.count}
							{`)`}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-blue-700 ">
						${price}
					</span>
					<a
						onClick={(e) => {
							e.preventDefault();
							showModal(item);
						}}
						href="#"
						className="btn btn-outline hover:bg-blue-700 hover:border-0 	 hover:text-white text-blue-700"
					>
						View Detail
					</a>
				</div>
			</div>
		</div>
	);
};

export default Product;
