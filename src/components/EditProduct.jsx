// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../slice/productSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setProducts } from "../slice/productSlice";

const EditProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const [editedProduct, setEditedProduct] = useState({
		name: "",
		brand: "",
		price: 0,
		image: "",
	});

	useEffect(() => {
		console.log(id);
		if (products.length > 0) {
			const product = products.find((product) => product.id == id);
			console.log(product);
			if (product) {
				setEditedProduct(product);
			}
		} else {
			axios
				.get(`http://localhost:3000/products/${id}`)
				.then((response) => setEditedProduct(response.data))
				.catch((error) => console.error(error));
		}
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedProduct({ ...editedProduct, [name]: value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const { name, brand, price, image } = editedProduct;

		// Updating product in db.json using json-server
		axios
			.put(`http://localhost:3000/products/${id}`, {
				name,
				brand,
				price: parseInt(price),
				image,
			})
			.then((response) => {
				// Updating product in Redux store
				dispatch(updateProduct(response.data));
			})
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<h1>Edit Product</h1>
			<form onSubmit={handleFormSubmit}>
				<label>Name:</label>
				<input
					type="text"
					name="name"
					value={editedProduct.name}
					onChange={handleInputChange}
					required
				/>

				<label>Brand:</label>
				<input
					type="text"
					name="brand"
					value={editedProduct.brand}
					onChange={handleInputChange}
					required
				/>

				<label>Price:</label>
				<input
					type="number"
					name="price"
					value={editedProduct.price}
					onChange={handleInputChange}
					required
				/>

				<label>Image URL:</label>
				<input
					type="url"
					name="image"
					value={editedProduct.image}
					onChange={handleInputChange}
					required
				/>

				{/* id is not editable by the user, so we don't include it in the form */}

				<button type="submit">Edit Product</button>
			</form>
		</div>
	);
};

export default EditProduct;
