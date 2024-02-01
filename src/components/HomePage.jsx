import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../slice/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => dispatch(setProducts(response.data)))
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
