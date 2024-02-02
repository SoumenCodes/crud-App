import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../slice/productSlice";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { setProducts } from "../slice/productSlice";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});

  // console.log(productDetail, "PD");
  useEffect(() => {
    // console.log(id);
    if (products.length > 0) {
      const product = products.find((product) => product.id == id);
      // console.log(product);
      if (product) {
        setProductDetail(product);
      }
    } else {
      axios
        .get(`http://localhost:5000/products/${id}`)
        .then((response) => setProductDetail(response.data))
        .catch((error) => console.error(error));
    }
  }, []);
  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
        Product Details {products.name}
      </h2>
      <div className="flex-col md:flex-row justify-between  flex gap-4 items-start mx-4 py-12">
        <div className="mx-auto">
          <div>
            <div className="flex bg-white rounded-lg shadow dark:bg-gray-800 p-4">
              <div className="relative flex-none w-24 md:w-48">
                <img
                  src={productDetail.image}
                  alt="shopping image"
                  className="absolute inset-0 object-cover w-full h-full rounded-lg"
                />
              </div>
              <form className="flex-auto p-6">
                <div className="flex flex-wrap">
                  <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">
                    {productDetail?.name}
                  </h1>
                  <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                    ${productDetail?.price}
                  </div>
                  <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                    In stock
                  </div>
                </div>

                <div className="flex mb-4 text-sm font-medium">
                  <button
                    type="button"
                    className="my-7 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Buy now
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {productDetail.brand}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
