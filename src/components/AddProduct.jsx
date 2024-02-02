import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

// import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, brand, price, image } = newProduct;

    // Adding product to db.json using json-server
    axios
      .post("http://localhost:5000/products", {
        name,
        brand,
        price,
        image,
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

  // const deleteProduct = async (id) => {
  //   await axios.delete(`http://localhost:5000/products/${id}`);
  //   const product = products.find((product) => product.id == id);
  //   console.log(product);
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/products")
  //     .then((response) => dispatch(setProducts(response.data)))
  //     .catch((error) => console.error(error));
  // }, [products]);

  return (
    <div>
      <div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add Product
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Add Product details which can be added on Db JSON
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Product Price
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="price"
                  value={parseInt(newProduct.price)}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Brand Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2.5">
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      {/* <h1>Add Product</h1>
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

       

        <button type="submit">Add Product</button>
      </form> */}
      {/* <div>
        {products?.map((item) => (
          <>
            <ProductTable
              data={item}
              key={item?.id}
              deleteProduct={deleteProduct}
            />
          </>
        ))}
      </div> */}
    </div>
  );
};

export default AddProduct;
