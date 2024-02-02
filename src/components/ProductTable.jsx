import React from "react";
import { Link } from "react-router-dom";

const ProductTable = ({ data, deleteProduct }) => {
	return (
		<>
			<div className="flex flex-row mt-5">
				<div className="flex-1 w-[200px]">
					<img src={data.image} className="w-full w-[200px]" />
				</div>
				<h3 className="flex-1">{data.name}</h3>
				<div className="flex-1">
					<Link
						className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
						to={`../products/${data.id}/edit`}
					>
						Edit
					</Link>
					<button
						className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
						onClick={() => deleteProduct(data.id)}
					>
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default ProductTable;
