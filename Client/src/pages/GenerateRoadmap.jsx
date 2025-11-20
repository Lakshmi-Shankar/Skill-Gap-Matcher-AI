import React from 'react';
import { Bot } from 'lucide-react'
import RoadmapButton from '../components/roadmapButton';

const GenerateRoadmap = () => {
    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md text-center">

                    {/* TITLE */}
                    <h1 className="text-3xl font-bold mb-4 text-gray-700">
                        RoadMap
                        <Bot className='inline-block ml-2'/>
                    </h1>

                    {/* CONTENT */}
                    <p className="text-gray-600 mb-6">
                        See how the AI builds a personalized roadmap for you.
                    </p>

                    {/* FORM */}
                    <div className="flex items-center justify-center gap-3">
                        <input
                            type="text"
                            placeholder="Your role for creation"
                            className="border border-gray-400 rounded-lg px-4 py-2 w-60 outline-none"
                        />
                        <div  onClick={() => {console.log("clicked")}}>
                            <RoadmapButton />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default GenerateRoadmap;
