import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './login.css'
import photo from '../Login/photo.webp'
import { toast } from 'react-toastify'
function Login() {
  const [loginData,setLoginData]  = useState({
    Username:'',
    password:''
  })
  const[username,setUsername] = useState('')
  const[message,setMessage] = useState("")
  const handleChange = (e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch('https://shopperstore-backend.onrender.com/api/login',
        {
          method:'POST',
           headers:{'Content-Type':'application/json'},
        body:JSON.stringify(loginData),
        }
        
      )
      const data = await response.json()
      if(response.ok){
        setMessage('Sign In Successful');
        setTimeout(()=>{
          window.location.href='/';
        },2000);
        toast.success('Login successfully')
      } else{
        toast.info('Login failed')
        setMessage(data.message || "Signin failed.Try again")
      }
    }catch(err){
      console.log('error:',err)
    }
   localStorage.setItem('username',loginData.Username);
   localStorage.setItem('isLoggenIn','true')
     setUsername(loginData.Username)
  }
  return (
  <div className='wrapper_login'>
    <div className='photo'>
        <img src={photo} alt='logo'/>
        </div>
    <div className='account_login'>
      
        <h2>Account Login</h2>
        <form onSubmit={handleSubmit}>
        <h3>Enter Username</h3>
        <input type='text' placeholder='Enter Username' name='Username' onChange={handleChange}/>
        <h3>Enter Password</h3>
        <input type='password' placeholder='Enter Password' name="password" onChange={handleChange}/>
        <div>
        <button type='submit'>Login</button>
        </div>
        
        <Link to='/signup'>New to ShopperStore? Create Account</Link>
        
        </form>
        
        </div>
    </div>
  )
}

export default Login