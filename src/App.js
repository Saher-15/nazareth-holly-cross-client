import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Tour from "./pages/Tour";
import OldCity from "./pages/OldCity";
import City from "./pages/City";
import MarysWell from "./pages/MarysWell";
import Latin from "./pages/Latin";
import Greek from "./pages/Greek";
import Privacy from "./pages/Privacy";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import ShopContextProvider from "./context/shop-context";
import About from "./pages/About";

function App() {

  return (
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/candle" element={<Layout><Services /></Layout>} />
          <Route path="/tour" element={<Layout><Tour /></Layout>} />
          <Route path="/oldcity" element={<Layout><OldCity /></Layout>} />
          <Route path="/city" element={<Layout><City /></Layout>} />
          <Route path="/maryswell" element={<Layout><MarysWell /></Layout>} />
          <Route path="/latin" element={<Layout><Latin /></Layout>} />
          <Route path="/greek" element={<Layout><Greek /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;