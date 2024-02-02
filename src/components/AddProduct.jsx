// src/components/AddProduct.js
import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { addProduct, setProducts } from "../slice/productSlice";
import axios from "axios";
import ProductTable from "./ProductTable";

const AddProduct = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	const [newProduct, setNewProduct] = useState({
		name: "",
		brand: "",
		price: 0,
		image: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const { name, brand, price, image } = newProduct;

		// Adding product to db.json using json-server
		axios
			.post("http://localhost:3000/products", {
				name,
				brand,
			})
			.then((response) => {
				// Adding product to Redux store
				dispatch(addProduct(response.data));
			})
			.catch((error) => console.error(error));

		// Clearing the form fields after submission
		setNewProduct({
			name: "",
			brand: "",
			price: 0,
			image: "",
		});
	};

	const deleteProduct = async (id) => {
		await axios.delete(`http://localhost:3000/products/${id}`);
		const product = products.find((product) => product.id == id);
		console.log(product);
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/products")
			.then((response) => dispatch(setProducts(response.data)))
			.catch((error) => console.error(error));
	}, [products]);

	return (
		<div>
			<h1>Add Product</h1>
			<form onSubmit={handleFormSubmit}>
				<label>Name:</label>
				<input
					type="text"
					name="name"
					value={newProduct.name}
					onChange={handleInputChange}
					required
				/>

				<label>Brand:</label>
				<input
					type="text"
					name="brand"
					value={newProduct.brand}
					onChange={handleInputChange}
					required
				/>

				<label>Price:</label>
				<input
					type="number"
					name="price"
					value={parseInt(newProduct.price)}
					onChange={handleInputChange}
					required
				/>

				<label>Image URL:</label>
				<input
					type="url"
					name="image"
					value={newProduct.image}
					onChange={handleInputChange}
					required
				/>

				{/* id is not editable by the user, so we don't include it in the form */}

				<button type="submit">Add Product</button>
			</form>
			<div>
				{products?.map((item) => (
					<>
						<ProductTable
							data={item}
							key={item?.id}
							deleteProduct={deleteProduct}
						/>
					</>
				))}
			</div>
		</div>
	);
};

export default AddProduct;
