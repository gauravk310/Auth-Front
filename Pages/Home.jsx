import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SuccessToast } from '../Utils/Sucess';
export const Home = () => {
  const [loggedInUser,setLoggedInUser] = useState('');
  useEffect(()=>{
    const user = localStorage.getItem('loggedinUser')
    setLoggedInUser(user);
  },[]) 
  const navigate = useNavigate();

const HandleLogOut = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedinUser');
    SuccessToast("Logging Out")
    setTimeout(()=>{
      navigate('/login')
    },3000);

}

  return (
    <>
    <div className='text-4xl m-10  font-bold p-10  bg-amber-50 justify-items-center ' >
    <div>Welcome ,</div>
    <div className='p-5 m-2'>{loggedInUser}</div>
    <button className="w-50 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition" onClick={HandleLogOut}>Log-Out</button>
    </div>
    <ToastContainer/>
    
    </>
  
  )
}
