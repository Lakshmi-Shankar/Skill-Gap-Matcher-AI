import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md z-20 sticky top-0">
            <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-3">
                        <img src="/path/to/logo.png" alt="Skill Gap Matcher Logo" className="h-8" />
                        <h1 className="text-2xl font-bold text-purple-600">
                            Skill Gap Matcher
                        </h1>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        <a 
                            href="/home" 
                            className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                        >
                            Home
                        </a>
                        <a 
                            href="/about" 
                            className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                        >
                            About Us
                        </a>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-purple-600">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;