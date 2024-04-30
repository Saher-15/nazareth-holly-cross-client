import React, { useEffect, useState } from "react";
import { Product } from "../components/Product";
import { PRODUCTS } from "../Products";
import "../styles/Shop.css";
import axios from "axios";



function Shop() {

const [data, setData]=useState();

  useEffect(() => {

    async function getAllProduct() {
      await axios.get(' https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/product/getAllProducts').then(res => {
        const data = res.data
        console.log(res)
        console.log(res.data)
        setData(data)

      })
    }

    getAllProduct();


  }, [])

  return (
    <div className="shop">

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>


  );
}

export default Shop;