import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import backgroundImage from '../../assets/background image.jpg';

const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
  <div className='bg-[rgba(8,20,37,0.379)] rounded-2xl shadow-xl p-10 max-w-md w-full text-center'>
        <h2 className='mb-6 text-white text-2xl font-bold'>Login</h2>
        <form className='flex flex-col items-center'>
          <div className='mb-5 w-full text-left'>
            <label className='block mb-2 text-white text-base font-medium'>Username</label>
            <input 
              type="text" 
              name="username" 
              className='w-full h-9 p-3 border border-[#7914cb36] rounded-lg text-base focus:border-blue-500 focus:shadow focus:shadow-blue-300 focus:outline-none'
            />
          </div>
          <div className='mb-5 w-full text-left'>
            <label className='block mb-2 text-white text-base font-medium'>Password</label>
            <input 
              type="password" 
              name="password" 
              className='w-full h-9 p-3 border border-[#7914cb36] rounded-lg text-base focus:border-blue-500 focus:shadow focus:shadow-blue-300 focus:outline-none'
            />
          </div>
          <div className='flex justify-between w-full gap-2 mb-5'>
            <button className='bg-[#19566a63] text-white py-3 px-5 rounded-lg text-lg font-semibold w-full transition-transform hover:bg-[#e17b27] hover:-translate-y-0.5 active:bg-[#d8671a] active:translate-y-0' type="submit">Login</button>
          </div>
          <div className='flex justify-center gap-5 py-2'>
            <FcGoogle className='text-2xl' />
            <ImFacebook2 className='text-2xl text-[#3b5998]' />
            <FaGithub className='text-2xl' />
          </div>
          <br />
          <Link to="/sign">
            <p className='text-white'>sign up</p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
