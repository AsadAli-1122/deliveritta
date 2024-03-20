import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  if(isLoggedIn){
    return <Outlet />
  }else{
    return <Navigate to='/login'/>
  }
}

export default PrivateRoutes;