import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import RoadmapButton from '../components/roadmapButton';
import RoadmapViewer from '../components/roadmapViewer';

const GenerateRoadmap = () => {
  const [role, setRole] = useState('');
  const [roadmap, setRoadmap] = useState(null);

  // On component mount, check localStorage
  useEffect(() => {
    const savedRoadmap = localStorage.getItem('roadmapData');
    if (savedRoadmap) {
      setRoadmap(JSON.parse(savedRoadmap));
    }
  }, []);

  const generationData = async () => {
    try {
      const response = await fetch(
        'https://skill-gap-matcher-ai.onrender.com/api/roadmap/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: role,
            skills: cookieStore.get('userData').skills,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      // Extract JSON block inside ```json ... ```
      const match = data.content.match(/```json([\s\S]*?)```/);
      if (!match) {
        console.error('No JSON block found in response.');
        return;
      }

      const jsonString = match[1].trim();
      const parsedRoadmap = JSON.parse(jsonString);

      // Save to localStorage
      localStorage.setItem('roadmapData', JSON.stringify(parsedRoadmap));
      setRoadmap(parsedRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md text-center">
          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-4 text-gray-700">
            RoadMap
            <Bot className="inline-block ml-2" />
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <div onClick={generationData}>
              <RoadmapButton />
            </div>
          </div>
        </div>
      </section>

      {roadmap && <RoadmapViewer roadmap={roadmap} />}
    </div>
  );
};

export default GenerateRoadmap;
