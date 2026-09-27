import Navbar from "../components/Navbar";
import Products from "../pages/Products";
import { Routes, Route } from "react-router";
import "./App.css";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
