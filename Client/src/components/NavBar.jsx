import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const path = location.pathname;
  const isLandingPage = path === '/';
  const isAuthPage = ['/login', '/signup'].includes(path);
  const isLoggedIn = !['/', '/about', '/signup', '/login'].includes(path);

  const handleLogout = async () => {
    await fetch('https://skill-gap-matcher-ai.onrender.com/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    Cookies.remove('editData');
    Cookies.remove('token');
    sessionStorage.clear();

    toast.warn('Logging out....');

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleHomeClick = () => {
    if (isAuthPage) navigate('/');
    else navigate('/home');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />

      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">            
            <img src="../assets/skillgapmatcher-logo.png" alt="Skill Gap Matcher Logo" className="h-9" />
            <h1 className="text-2xl font-bold text-purple-600">Skill Gap Matcher</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLandingPage && (
              <button onClick={handleHomeClick} className="text-gray-700 hover:text-purple-600 transition font-medium">
                Home
              </button>
            )}

            {!isLandingPage && !isAuthPage && (
              <a href="/about" className="text-gray-700 hover:text-purple-600 transition font-medium">
                About Us
              </a>
            )}

            {isLoggedIn && (
              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition font-medium">
                <LogOut size={20} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 hover:text-purple-600 transition">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-4 shadow-md">
          {!isLandingPage && (
            <button onClick={() => { setMobileOpen(false); handleHomeClick(); }} className="block w-full text-left text-gray-700 text-lg hover:text-purple-600 transition">
              Home
            </button>
          )}

          {!isLandingPage && !isAuthPage && (
            <a href="/about" onClick={() => setMobileOpen(false)} className="block w-full text-left text-gray-700 text-lg hover:text-purple-600 transition">
              About Us
            </a>
          )}

          {isLoggedIn && (
            <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="block w-full text-left flex items-center gap-2 text-gray-700 text-lg hover:text-red-600 transition">
              <LogOut size={20} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}