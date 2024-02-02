// src/components/AddProduct.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../slice/productSlice";
import axios from "axios";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: 0,
    image: "",
    id: null, // id will be assigned by json-server
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Adding product to db.json using json-server
    axios
      .post("http://localhost:5000/products", newProduct)
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
      id: null,
    });
  };

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
          value={newProduct.price}
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
    </div>
  );
};

export default AddProduct;
