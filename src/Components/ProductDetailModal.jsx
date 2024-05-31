import React from "react";

const ProductDetailModal = ({ item }) => {
    if (!item) return null;

    
    const {title, price,id ,description ,category , image, rating } = item

    // console.log(item);

	return (
		<div>
			
			<dialog id="product-detail" className="modal rounded-none">
				<div className="modal-box rounded-none h-[70%] text-justify md:text-left  min-w-[70%] lg:min-h-[80%]">
					<div className="flex flex-col lg:flex-row  justify-center items-center">
                        <div className="flex-1">
                                <img src={image}  alt={title}  className="w-96 max-h-[400px]  object-scale-down  mx-auto" />
                        </div>
                        <div className="w-96 p-5  flex-1 h-96 ">
                            <h1 className="text-2xl font-medium">{title}</h1>
                            
                            <p className="text-2xl p-2 font-medium text-blue-700 border-y-2  border-blue-700 inline-block my-4">${price}</p>

                            <div className="space-y-2">
                            <p><span className="font-medium">product code</span> : {id}</p>
                            <p>{rating.count} review </p>

                            <p><span className="font-medium">category : </span> {category}</p>
                            <p>{description}</p>
                            </div>

                            <button className="btn btn-primary bg-blue-700 rounded-none text-white font-medium px-8 my-4">Buy Now</button>

                        </div>
                        <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
                    </div>
                    
					
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default ProductDetailModal;
