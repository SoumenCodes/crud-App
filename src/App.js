import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import {
  default as EditProduct,
  default as ProductDetails,
} from "./components/EditProduct";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        {/* <Route path="/products/:id/edit" element={<EditProduct />} /> */}
        <Route path="/products/:id " element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
