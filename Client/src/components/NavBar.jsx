import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isLandingPage = path === '/';
  const isAuthPage = ['/login', '/signup'].includes(path);
  const isLoggedIn = !['/', '/about', '/signup', '/login', '/about'].includes(path);
  const hasCookie = !!Cookies.get('editData');

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    Cookies.remove('editData');
    navigate('/');
  };

  const handleHomeClick = () => {
    if (isAuthPage) navigate('/');
    else navigate('/home');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/path/to/logo.png" alt="Skill Gap Matcher Logo" className="h-8" />
            <h1 className="text-2xl font-bold text-purple-600">Skill Gap Matcher</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLandingPage && (
              <button
                onClick={handleHomeClick}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Home
              </button>
            )}

            {!isLandingPage && !isAuthPage &&(
                          <a
              href="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              About Us
            </a>
          )}
          {/* <a
            href="/about"
            className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
          >
            About Us
            </a> */}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
