import React from 'react'
import { CiStar } from "react-icons/ci";
import '../Buynow/Buy.css'
import { Link } from 'react-router-dom';
import { HiCurrencyRupee } from "react-icons/hi";
export default function buy() {

  const selectedProducts=JSON.parse(localStorage.getItem('selectedProducts'))
  console.log(selectedProducts)
  return (
    <div className='buy_container'>
      <div className='buy_img'>
        <img src={selectedProducts.img}/>
      </div>
      <div className='buy_content'>
        <h2>
         {selectedProducts.title}
        </h2>
        <span>
        {selectedProducts.rating}<CiStar/>
        </span>
        <h3>
<HiCurrencyRupee />{`${Math.floor(selectedProducts.price*84)}`}
        </h3>
      <Link to='/buynow/checkout'><button className='buy_button'>Continue to Buy</button></Link> 
      </div>
    </div>
  )
}
