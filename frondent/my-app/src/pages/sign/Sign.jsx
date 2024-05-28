import React from 'react'
import "./sign.css"
import loginImage from '../../assets/login.jpg'; 

const Sign = () => {
  return (
    <div className='sign-main'>
      <div className='sign-page'>
        <div className='image-container'>
          <img src={loginImage} alt="Sign in" className='sign-image' />
        </div>
        <div className='form-container'>
          <div className='content'>
            <h2 className='reg'>Register</h2>
          </div>
          <form>
            <div className='input'>
              <label>Username</label>
              <input type="text" name="username" />
            </div>
            <div className='input'>
              <label>Email</label>
              <input type="email" name="email" />
            </div>
            <div className='input'>
              <label>Password</label>
              <input type="password" name="password" />
            </div>
            <div className='input'>
              <label>Confirm Password</label>
              <input type="password" name="confirm_password" />
            </div>
            <div className='input'>
              <label>Phone Number</label>
              <input type="tel" name="phonenumber" />
            </div>
            <div className='sig-btm'>
              <button className='btn-sig' type="submit">Register</button>
            </div>
            <p className='login-link'>Already have an account? <a href="/login">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Sign
