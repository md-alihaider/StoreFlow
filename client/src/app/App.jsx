import Navbar from "../components/Navbar";
import Products from "../pages/Products";
import { Routes, Route } from "react-router";
import "./App.css";
import Home from "../pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
