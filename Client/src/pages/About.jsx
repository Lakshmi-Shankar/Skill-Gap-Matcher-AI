import React from 'react';
import { Target, Brain, TrendingUp, Users, Award } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Driven Analysis",
      description: "Advanced algorithms analyze your skills and identify competency gaps with precision"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Paths",
      description: "Custom learning recommendations tailored to your career goals and industry needs"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Industry Aligned",
      description: "Stay ahead with insights based on real-time industry demands and trends"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Actionable Guidance",
      description: "Clear, data-backed recommendations to accelerate your professional growth"
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4">
            Skill Gap Matcher
          </h1>
          <p className="text-xl text-purple-700">AI-Powered Career Intelligence</p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 md:p-12 shadow-lg mb-12 border border-purple-100">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            About Us
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              At <span className="font-semibold text-purple-900">Skill Gap Matcher – AI</span>, we bridge the gap between what learners know and what the industry demands. Our intelligent platform analyzes user skills, identifies missing competencies, and recommends personalized roles, resources, and learning paths.
            </p>
            <p>
              We combine AI-driven insights with a user-friendly interface to help students, job seekers, and professionals make smarter career moves. Our goal is simple: <span className="font-semibold text-purple-900">empower every user to reach their full potential through data-backed skill development and clear, actionable guidance.</span>
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-md border border-purple-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-purple-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-purple-200 mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-purple-700">
          <p className="text-sm">© 2024 Skill Gap Matcher – AI. Empowering careers through intelligent insights.</p>
        </div>
      </div>
    </div>
  );
}