// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../slice/productSlice";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { setProducts } from "../slice/productSlice";

const EditProduct = () => {
  const navigate = useNavigate();
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
    // console.log(id);
    if (products.length > 0) {
      const product = products.find((product) => product.id == id);
      // console.log(product);
      if (product) {
        setEditedProduct(product);
      }
    } else {
      axios
        .get(`http://localhost:5000/products/${id}`)
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
      .put(`http://localhost:5000/products/${id}`, {
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
    navigate("/productList");
  };

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
                  value={editedProduct.name}
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
                  value={editedProduct.price}
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
                  value={editedProduct.brand}
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
                  value={editedProduct.image}
                  onChange={handleInputChange}
                  required
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
              Edit Product
            </button>
          </div>
        </form>
      </div>
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
