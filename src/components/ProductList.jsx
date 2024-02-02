import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "./ProductTable";

import axios from "axios";
import { setProducts } from "../slice/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    const product = products.find((product) => product.id == id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => dispatch(setProducts(response.data)))
      .catch((error) => console.error(error));
  }, [products]);

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
        Product List
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "1rem",
          // border: "2px solid black",
          justifyContent: "center",
        }}
      >
        {products?.map((item) => (
          <ProductTable
            data={item}
            key={item?.id}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
