import React from "react";
import emptyCartImage from "../Cart/empty-cart.webp"; // Update with the correct image path
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="empty_cart">
      <img src={emptyCartImage} alt="Empty Cart" />
      <h2>Your Cart is Empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
     <Link to='/'>
     <button className="shop_now_btn" >
        Shop Now
      </button>
     </Link> 
    </div>
  );
};

export default EmptyCart;
