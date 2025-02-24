import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import photo from '../Login/photo.webp'
import '../Signup/Signup.css'
function SignUp() {
  const [formData,setFormData] = useState({
    First_Name:'',
    Last_Name:'',
    Username:'',
    Email:'',
    password:'',
  })
  const [message,setMessage] = useState("");
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch("https://shopperstore-backend.onrender.com/api/signup",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await response.json();
      if(response.ok){
        setMessage('Sign Successful');
        setTimeout(()=>{
          window.location.href='/login';
        },2000);
      } else{
        setMessage(data.message || "Signup failed.Try again")
      }
    }catch(err){
      console.log("error",err)
      setMessage('Error')
    }
  }
  return (
    <div className='wrapper_signup'>
      <div className='photo'>
        <img src={photo} alt='logo'/>
        </div>
    <div className='account_signup'>
         
        <h2>Create Account</h2>
        
        
        <form onSubmit={handleSubmit}>
        {message &&<p>{message}</p>}
        <h3>Enter First Name</h3>
        <input type='text' placeholder='First Name' name='First_Name' onChange={handleChange}/>
        <h3>Enter Last Name</h3>
        <input type='text' placeholder='Last Name' name='Last_Name' onChange={handleChange}/>
        <h3>Enter Username</h3>
        <input type='text' placeholder='Username' name='Username' onChange={handleChange}/>
        <h3>Enter Email</h3>
        <input type='text' placeholder='Email' name='Email' onChange={handleChange}/>
        <h3>Enter Password</h3>
        <input type='password' placeholder='Password' name='password' onChange={handleChange}/>
        <div>
        <button type='submit'>Signup</button>
        </div>
        
        <Link to='/login'>Already have Account? Login In</Link>
        
        </form>
        
        </div>
    </div>
  )
}

export default SignUp