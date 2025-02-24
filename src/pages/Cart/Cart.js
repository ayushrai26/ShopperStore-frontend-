import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Cart/Cart.css";
import EmptyCart from "./EmptyCart"; // Import EmptyCart component
import { toast } from "react-toastify";
import { HiCurrencyRupee } from "react-icons/hi";
function CartPage({setCartCount}) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart data from local storage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
    setCartProducts(storedCart);
  }, []);

  const handleRemove = (productId) => {
    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
    const updatedCart = storedCart.filter((product) => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
    setCartCount(updatedCart.length)
    toast.success('Item Removed')
  };

  const handleShopNow = () => {
    window.location.href = "/products"; // Redirect to products page
  };
  const handleClick = (product)=>{
    console.log(product)
    localStorage.setItem('selectedProducts',JSON.stringify(product));

  }

  return (
    <div className="cartPage_container">
      <h2 className="shopping_cart_heading">Your Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <EmptyCart onShopNow={handleShopNow} />
      ) : (
        <div className="main_product_cart">
          {cartProducts.map((product, index) => (
            <div className="product_cart" key={index}>
              <div>
                <img src={product.img} width="50px" alt="product" />
              </div>
              <div className="items_info">
                <span>{product.title}</span>
                <div className="items_price">
                  <span><HiCurrencyRupee />{`${Math.floor(product.price*84)}`}</span>
                </div>
                <div className="cart_buttons">
                  <Link to="/buynow">
                    <button onClick={()=>handleClick(product)}>Buy Now</button>
                  </Link>
                  <button onClick={() => handleRemove(product.id) }>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
