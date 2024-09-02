import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ShopContextProvider from "./context/shop-context";
// Regular imports for other pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import OldCity from "./pages/OldCity";
import City from "./pages/City";
import MarysWell from "./pages/MarysWell";
import Latin from "./pages/Latin";
import Greek from "./pages/Greek";
import Cart from "./pages/cart/cart";
import About from "./pages/About";
import CheckOut from "./pages/CheckOut";
import ContactUs from "./pages/ContactUs";
import CheckOutCandle from "./pages/CheckOutCandle";
import Live from "./pages/Live";
// Lazy load specific components
const Tour = lazy(() => import("./pages/Tour"));
const Shop = lazy(() => import("./pages/shop/shop"));
const ProductPage = lazy(() => import("./pages/shop/ProductPage"));



function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/candle" element={<Layout><Services /></Layout>} />
          
          {/* Wrap only the lazy-loaded routes with Suspense */}
          <Route 
            path="/tour" 
            element={
              <Suspense fallback={<div>Loading Tour...</div>}>
                <Layout>
                  <Tour />
                </Layout>
              </Suspense>
            } 
          />
          
          <Route 
            path="/shop" 
            element={
              <Suspense fallback={<div>Loading Shop...</div>}>
                <Layout>
                  <Shop />
                </Layout>
              </Suspense>
            } 
          />
          
          <Route 
            path="/product/:id" 
            element={
              <Suspense fallback={<div>Loading Product...</div>}>
                <Layout>
                  <ProductPage />
                </Layout>
              </Suspense>
            } 
          />
          {/* End of lazy-loaded routes */}
          
          <Route path="/oldcity" element={<Layout><OldCity /></Layout>} />
          <Route path="/city" element={<Layout><City /></Layout>} />
          <Route path="/maryswell" element={<Layout><MarysWell /></Layout>} />
          <Route path="/latin" element={<Layout><Latin /></Layout>} />
          <Route path="/greek" element={<Layout><Greek /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckOut /></Layout>} />
          <Route path="/checkoutcandle" element={<Layout><CheckOutCandle /></Layout>} />
          <Route path="/Live" element={<Layout><Live /></Layout>} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;