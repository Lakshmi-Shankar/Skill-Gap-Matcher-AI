import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import AboutUs from './pages/About';

const App = () => {
  const location = useLocation();
  const hideNavBar = [].includes(location.pathname);
  return (
    <>
      {!hideNavBar && <NavBar />}
      
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile-edit' element={<EditProfile />} />

      </Routes>
    </>
  );
}

export default App;
