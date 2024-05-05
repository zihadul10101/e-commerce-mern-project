import React from 'react'
import {
   BrowserRouter,
  Routes,Route,
  } from "react-router-dom";
import Home from '../pages/Home';
import Error from '../pages/Error';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../pages/authPage/Register';
import ActivateAccount from '../pages/authPage/ActivateAccount';
import Dashboard from '../dashbord/Dashboard';
import Login from '../pages/authPage/Login';
import ForgotPassword from '../pages/authPage/ForgotPassword';
import ResetPassword from '../pages/authPage/resetPassword';
import UserProfile from '../pages/authPage/UserProfile';
import UpdatePassword from '../pages/authPage/UpdatePassword';
import UpdatedUserInfo from '../pages/authPage/UpdatedUserInfo';



const Index = () => {

  return (
  
    <main className="flex flex-col min-h-[100vh]">
        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <BrowserRouter>
    <Navbar />
  
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/users/activate/:token" element={<ActivateAccount />}/>
        <Route path="/users/reset-password/:token" element={<ResetPassword />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/updated-password' element={<UpdatePassword />}/>
        <Route path='/updated-user-info' element={<UpdatedUserInfo />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/user-profile' element={<UserProfile />}/>
        <Route path='/logout' element={<Login />}/>
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/*' element={<Error />}/>
    </Routes>
    <Footer />
    
    </BrowserRouter>
    </main>
  )
}

export default Index