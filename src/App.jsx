import { useState } from 'react'
// import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../Pages/Login'
import { SignUp } from '../Pages/SignUp'
import { Home } from '../Pages/Home'
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { RefreshHandler } from '../Components/RefreshHandler'
function App() {
  
  const [isAuth,setIsAuth] = useState();
  const PrivateRoute  = ({element})=>{
    return isAuth ? element: <Navigate to='/login'/>
  }

  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuth} />
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes> 
      <ToastContainer/>
    </div>
  )
}

export default App
