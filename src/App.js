import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Tour from './pages/Tour';
import OldCity from './pages/OldCity';
import City from './pages/City';
import MarysWell from './pages/MarysWell';
import Latin from './pages/Latin';
import Greek from './pages/Greek';
import Shop from './pages/Shop';
import { Cart } from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Privacy from './pages/Privacy';
import { ShopContextProvider } from "./context/shop-context";


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/services" element={
            <Layout>
              <Services />
            </Layout>
          } />
          <Route path="/contact-us" element={
            <Layout>
              <ContactUs />
            </Layout>
          } />
          <Route path="/tour" element={
            <Layout>
              <Tour />
            </Layout>
          } />
          <Route path="/product" element={
            <Layout>
              <Shop />
            </Layout>
          } />
          <Route path="/cart" element={
            <Layout>
              <Cart />
            </Layout>
          } />
          <Route path="/oldcity" element={
            < Layout >
              <OldCity />
            </Layout >
          } />
          <Route path="/city" element={
            < Layout >
              <City />
            </Layout >
          } />
          <Route path="/maryswell" element={
            < Layout >
              <MarysWell />
            </Layout >
          } />
          <Route path="/latin" element={
            < Layout >
              <Latin />
            </Layout >
          } />
          <Route path="/greek" element={
            < Layout >
              <Greek />
            </Layout >
          } />
          <Route path="/privacy-policy" element={
            < Layout >
              <Privacy />
            </Layout >
          } />



        </Routes >
      </Router >
  )
}

export default App