import React, { useState,useEffect } from 'react'
import '../styles/Card.css'
import { CiStar } from "react-icons/ci";
import {toast} from 'react-toastify';
import { HiCurrencyRupee } from "react-icons/hi";
function Card(props) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart data from local storage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
    setCartProducts(storedCart);
  }, []);
  
  const handleClick = () => {
    // Load existing cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
  
    // Create a new product object with a unique ID
    const newProduct = {
      id: props.id, // Ensure 'id' is passed from props
      img: props.images,
      title: props.title,
      rating: props.rating,
      price: props.price,
    };
  
    // Check if product already exists in the cart
    const isProductInCart = storedCart.some(product => product.id === newProduct.id);
  
    if (!isProductInCart) {
      // Add new product to the cart
      const updatedCart = [...storedCart, newProduct];
  
      // Save updated cart to local storage
      localStorage.setItem("products", JSON.stringify(updatedCart));
  
      // Update state
      setCartProducts(updatedCart);
      props.setCartCount(updatedCart.length);
      console.log("Product added to cart:", newProduct);
      toast.success('Item added to cart')
    } else {
      toast.info('Product already in cart')
      console.log("Product already in cart!");
    }
  };
  
  return (
    <div className='wrapper'>
     <div className='image'>
        <img src={props.images} width='150px' className='product_image' alt='logo' />
     </div>
     <div className='description'>
       <h2 className='title_heading'>{props.title}</h2>
       
       <span className='rating'>
            {props.rating}<CiStar />
        </span>
        
        <div>
        <h2><HiCurrencyRupee />{`${Math.floor(props.price*84)}`}</h2>
          
        
        </div>
        <div>
            <button className='button_cart' onClick={handleClick}>Add to Cart</button>
            
        </div>
        
     </div>
        
    </div>
  )
}

export default Card