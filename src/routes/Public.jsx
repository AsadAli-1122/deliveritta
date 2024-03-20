import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoutes = () => {
  const { isLoggedIn } = useAuth();
  if(!isLoggedIn){
    return <Outlet />
  }else{
    return <Navigate to='/admin/dashboard'/>
  }
}

export default PublicRoutes;