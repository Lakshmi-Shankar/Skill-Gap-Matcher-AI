import React from 'react';
import { Link } from 'react-router-dom';
import LandingCard from '../components/LandingCard';
import GetStarted from '../components/GetStarted';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-purple-50">
            {/* Hero Section */}
            <section className="px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center animate-fadeIn">
                    <h1 className="text-5xl sm:text-6xl font-bold text-purple-900 mb-6">
                        Bridge Your Skill Gap
                    </h1>
                    <p className="text-xl text-purple-600 mb-10 max-w-2xl mx-auto">
                        AI-powered platform that finds your best-fit career roles and builds your learning plan.
                    </p>
                    <Link 
                        to="/signup"
                        className="inline-block"
                    >
                        <GetStarted />
                    </Link> 
                    
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8 animate-fadeIn delay-200">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        {/* <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-3">
                                AI Skill Matching
                            </h3>
                            <p className="text-purple-600">
                                Our advanced AI analyzes your skills and matches you with the most suitable career roles based on your strengths.
                            </p>
                        </div> */}
                        <LandingCard title={"AI Skill Matching"} content={"Our advanced AI analyzes your skills and matches you with the most suitable career roles based on your strengths."   } />

                        {/* Feature 2 */}
                        {/* <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-3">
                                Personalized Roadmap
                            </h3>
                            <p className="text-purple-600">
                                Get a customized learning path tailored to your goals, helping you acquire the skills you need step by step.
                            </p>
                        </div> */}
                        <LandingCard title={"Personalized Roadmap"} content={"Get a customized learning path tailored to your goals, helping you acquire the skills you need step by step."} />

                        {/* Feature 3 */}
                        {/* <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-3">
                                Real-Time Progress Tracking
                            </h3>
                            <p className="text-purple-600">
                                Monitor your learning journey with detailed analytics and insights to stay motivated and on track.
                            </p>
                        </div> */}
                        <LandingCard title={"Real-Time Progress Tracking"} content={"Monitor your learning journey with detailed analytics and insights to stay motivated and on track."} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-4 py-8 sm:px-6 lg:px-8 border-t border-purple-200 mt-20">
                <div className="max-w-6xl mx-auto text-center text-purple-600">
                    <p>© 2025 Skill Gap Matcher</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
