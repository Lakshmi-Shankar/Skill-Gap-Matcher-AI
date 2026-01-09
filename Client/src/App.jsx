import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import AboutUs from './pages/About';
import Roles from './pages/Roles';
import GenerateRoadmap from './pages/GenerateRoadmap';

const App = () => {
  const location = useLocation();

  return (
    <>
      <NavBar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageFade>
                <LandingPage />
              </PageFade>
            }
          />

          <Route
            path="/home"
            element={
              <PageFade>
                <Home />
              </PageFade>
            }
          />

          <Route
            path="/about"
            element={
              <PageFade>
                <AboutUs />
              </PageFade>
            }
          />

          <Route
            path="/signup"
            element={
              <PageFade>
                <Signup />
              </PageFade>
            }
          />

          <Route
            path="/login"
            element={
              <PageFade>
                <Login />
              </PageFade>
            }
          />

          <Route
            path="/profile-edit"
            element={
              <PageFade>
                <EditProfile />
              </PageFade>
            }
          />

          <Route
            path="/roles"
            element={
              <PageFade>
                <Roles />
              </PageFade>
            }
          />

          <Route
            path="/generate/roadmap"
            element={
              <PageFade>
                <GenerateRoadmap />
              </PageFade>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

// Reusable fade animation wrapper
const PageFade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default App;
