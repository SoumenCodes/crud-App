import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
// import {
//   default as EditProduct,
//   default as ProductDetails,
// } from "./components/EditProduct";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
