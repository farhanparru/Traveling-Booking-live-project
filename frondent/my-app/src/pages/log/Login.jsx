import React from 'react'
import "./login.css"

const Login = () => {
  return (
    <div className='main-container'>
      <div className='main'>
        <h2 className='login'>Login</h2>
        <form>
          <div className='inputGroup'>
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
            />
          </div>
          <div className='inputGroup'>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
            />
          </div>
          <div className='btnGroup'>
            <button className='btn' type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login