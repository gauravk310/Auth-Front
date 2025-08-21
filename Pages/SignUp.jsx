import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ErrorToast } from '../Utils/Error'
import { SuccessToast } from '../Utils/Sucess'

export const SignUp = () => {
    const [signupInfo,setsignupInfo] = useState({
      name:'',
      email:'',
      password:''
    })
    const navigate = useNavigate();
    const HandleChange = (e)=>{
      const {name,value} = e.target;
      const inputData = {...signupInfo}
      inputData[name] = value
      setsignupInfo(inputData)
      
    };
    
    const HandleSubmit = async (e) =>{
      // console.log(signupInfo);
      e.preventDefault();
      const {name,email,password} = signupInfo;
      if (!name || !email || !password){
        ErrorToast("Provide All Credentials")
      }
      try {
        const url = 'http://localhost:8080/auth/signup';
        const response = await fetch(url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {sucess,message , error} = result;
        // console.log("Data Submited :",sucess,message);
        if(sucess){
            SuccessToast(message);
            setTimeout(()=>{
              navigate('/login');
            },3000)
        }else if(error){
          const err = error?.details[0].message;
          ErrorToast(err);
        }
        // console.log(result);
        
      } catch (error) {
        ErrorToast(error)
      }
    }

  return ( 
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign-Up</h1>
        <form className="space-y-5" onSubmit={HandleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name :
            </label>
            <input
              onChange={HandleChange}
              type="text"
              value={signupInfo.name}
              name="name"
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email :
            </label>
            <input
            onChange={HandleChange}
              type="email"
              value={signupInfo.email}
              name="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password :
            </label>
            <input
              type="password"
              onChange={HandleChange}
              name="password"
              value={signupInfo.password}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Sign-Up
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Log-In
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  
    </>
  )
}




