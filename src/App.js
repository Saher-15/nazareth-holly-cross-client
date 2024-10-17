import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ShopContextProvider from "./context/shop-context";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Candle = lazy(() => import("./components/Candle"));
const OldCity = lazy(() => import("./components/OldNazareth"));
const City = lazy(() => import("./components/Nazareth"));
const MarysWell = lazy(() => import("./components/Marys"));
const Latin = lazy(() => import("./components/LatinChurch"));
const Greek = lazy(() => import("./components/GreekChurch"));
const Cart = lazy(() => import("./pages/cart/cart"));
const About = lazy(() => import("./pages/About"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Prayer = lazy(() => import("./components/Prayer"));
const CheckOutCandle = lazy(() => import("./pages/CheckOutCandle"));
const CheckOutDonation = lazy(() => import("./pages/CheckOutDonation"));
const Live = lazy(() => import("./pages/Live"));
const Tour = lazy(() => import("./components/NazarethTour"));
const Shop = lazy(() => import("./pages/shop/shop"));
const ProductPage = lazy(() => import("./pages/shop/ProductPage"));

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Suspense fallback={<div>Loading Home...</div>}>
                <Layout>
                  <Home />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/candle" 
            element={
              <Suspense fallback={<div>Loading Services...</div>}>
                <Layout>
                  <Candle />
                </Layout>
              </Suspense>
            } 
          />
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
          <Route 
            path="/oldcity" 
            element={
              <Suspense fallback={<div>Loading Old City...</div>}>
                <Layout>
                  <OldCity />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/city" 
            element={
              <Suspense fallback={<div>Loading City...</div>}>
                <Layout>
                  <City />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/maryswell" 
            element={
              <Suspense fallback={<div>Loading Mary's Well...</div>}>
                <Layout>
                  <MarysWell />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/latin" 
            element={
              <Suspense fallback={<div>Loading Latin...</div>}>
                <Layout>
                  <Latin />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/greek" 
            element={
              <Suspense fallback={<div>Loading Greek...</div>}>
                <Layout>
                  <Greek />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Suspense fallback={<div>Loading Cart...</div>}>
                <Layout>
                  <Cart />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/reviews" 
            element={
              <Suspense fallback={<div>Loading Prayer...</div>}>
                <Layout>
                  <Prayer />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<div>Loading About...</div>}>
                <Layout>
                  <About />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Suspense fallback={<div>Loading CheckOut...</div>}>
                <Layout>
                  <CheckOut />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/checkoutcandle" 
            element={
              <Suspense fallback={<div>Loading CheckOut Candle...</div>}>
                <Layout>
                  <CheckOutCandle />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/checkoutdonation" 
            element={
              <Suspense fallback={<div>Loading CheckOut Donation...</div>}>
                <Layout>
                  <CheckOutDonation />
                </Layout>
              </Suspense>
            } 
          />
          <Route 
            path="/Live" 
            element={
              <Suspense fallback={<div>Loading Live...</div>}>
                <Layout>
                  <Live />
                </Layout>
              </Suspense>
            } 
          />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
