import React from 'react'
import '../Feedback/Feedback.css'
export default function Feedback() {
  return (
    <div className='feedback_form'>
    <div >
    <h1>Feedback Form</h1>
        
        </div>
        <div className='form'>
            <form className='form_inputs'>
            
              <label for='name' >Name</label>
              <input type='text' placeholder='Enter Name' id='name' />
              
              
              <label for='Email'>Email</label>
              <input type='text' placeholder ='Enter Email' id='Email'/>
              
             
              <label for='subject'>Subject</label>
              <input type='text' placeholder='subject' id='subject'/>
              
              <label for='feedback'>Feedback</label>
              <textarea rows='5' cols='50' placeholder='Type your Feedback' id='feedback'/>
            </form>
        </div>
    </div>
  )
}
