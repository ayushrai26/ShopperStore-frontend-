import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import CSS for styling
import Login from '../../Login/Login';
import Signup from '../../Signup/SignUp';
import Products from '../../Home/Components/Products';
import '../styles/Main.css';
import Cart from '../../Cart/Cart';
import Header from '../Components/Header';
import Help from '../../Help/Help';
import Feedback from '../../Feedback/Feedback';
import Profile from '../../Profile/Profile';
import Ad from '../Components/Ad';
import Buy from '../../Buynow/Buy';

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("products")) || [];
    return storedCart.length; // Initialize from localStorage
  });

  return (
    <div className='router'>
      {/* ✅ ToastContainer added here for global notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path='/' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Ad/><Products searchQuery={searchQuery} setCartCount={setCartCount}/></>}/>
        <Route path='/login' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Login/></>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Cart setCartCount={setCartCount}/></>}/>
        <Route path='/help' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Help/></>}/>
        <Route path='/profile' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Profile/></>}/>
        <Route path='/feedback' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Feedback/></>}/>
        <Route path='/buynow' element={<><Header setSearchQuery={setSearchQuery} cartCount={cartCount}/><Buy/></>}/>
      </Routes>
    </div>
  );
}

export default Main;
