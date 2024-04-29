import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Services from './components/pages/Services'
import Tour from './components/pages/Tour'
import OldCity from './components/pages/OldCity'
import City from './components/pages/City'
import MarysWell from './components/pages/MarysWell'
import Latin from './components/pages/Latin'
import Greek from './components/pages/Greek'

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
        <Route path="/tour" element={
          <Layout>
            <Tour />
          </Layout>
        } />
        <Route path="/products" element={
          <Layout>
            <Products />
          </Layout>
        } />
        <Route path="/oldcity" element={
          <Layout>
            <OldCity />
          </Layout>
        } />
        <Route path="/city" element={
          <Layout>
            <City />
          </Layout>
        } />
        <Route path="/maryswell" element={
          <Layout>
            <MarysWell />
          </Layout>
        } />
        <Route path="/latin" element={
          <Layout>
            <Latin />
          </Layout>
        } />
        <Route path="/greek" element={
          <Layout>
            <Greek />
          </Layout>
        } />



      </Routes>
    </Router>
  )
}

export default App