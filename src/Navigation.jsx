import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import PageNotFound from './pages/404';
import Layout from './components/layout/Layout';
import PublicRoutes from './routes/Public';
import Login from './pages/auth/Login';
import PrivateRoutes from './routes/Private';
import Dashboard from './pages/admin/dashboard';

const Navigation = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Layout><Home /></Layout>}/>
        <Route path='/about' element={<Layout><About /></Layout>}/>
        <Route path='/contact-us' element={<Layout><ContactUs /></Layout>}/>
        <Route path="/" element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
        <Route path='/*' element={<PageNotFound />}/>
    </Routes>
    </>
  )
}

export default Navigation;