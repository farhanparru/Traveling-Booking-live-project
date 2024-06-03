import React from 'react';
import { Link } from 'react-router-dom';
import "./sign.css";
import imgg from "../../assets/login.jpg";
import { FaFacebookSquare } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Sign = () => {
  return (
    <div className='main-reg'>
      <div className='reg-main'>  
        <div className='img-container'>
          <img src={imgg} alt="Register" />
        </div>
        <div className='form-container'>
        <div className='content-reg'>
            <p>Join us to discover exclusive travel deals and book your dream vacation today.</p>
          </div>
          <h2 className='reg'>Register</h2>
           <div className='icn-reg'>
            <FcGoogle/>
            <SiGithub style={{ color: '#333' }}/>
            <FaFacebookSquare style={{ color: '#4267B2' }} />
           </div>
          <form className='frm-reg'>
            <div className='inputGroup'>
              <label className='lb-reg'>Username</label>
              <input type="text" name="username" className='inpt-reg'/>
            </div>
            <div className='inputGroup'>
              <label className='lb-reg'>Email</label>
              <input type="email" name="email" className='inpt-reg'/>
            </div>
            <div className='inputGroup'>
              <label className='lb-reg'>Password</label>
              <input type="password" name="password" className='inpt-reg'/>
            </div>
            <div className='inputGroup'>
              <label className='lb-reg'>Confirm Password</label>
              <input type="password" name="password" className='inpt-reg'/>
            </div>
            <div className='btnGroup-reg'>
              <button className='btn-reg' type="submit">Register</button>
              <Link to={"/login"}>
                <button className='btn-log' type="button">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
