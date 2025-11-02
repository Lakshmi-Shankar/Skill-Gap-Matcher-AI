import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const hideNavBar = ['/signup', '/login'].includes(location.pathname);
  return (
    <>
      {!hideNavBar && <NavBar />}
      
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={ <LandingPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<div>About Us Page</div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
