import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import RoadmapButton from "../components/roadmapButton";
import RoadmapViewer from "../components/roadmapViewer";

const GenerateRoadmap = () => {
  const [role, setRole] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const savedLinks = localStorage.getItem("roadmapLinks");
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  const generationData = async () => {
    try {
      const userData = await cookieStore.get("userData");
      const skills = userData?.skills || [];

      const response = await fetch(
        "https://skill-gap-matcher-ai.onrender.com/api/roadmap/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, skills }),
        }
      );

      const data = await response.json();
      const extractedLinks = data.links || data.Links || [];
      setLinks(extractedLinks);
      localStorage.setItem("roadmapLinks", JSON.stringify(extractedLinks));
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {links.length > 0 ? (
        // Two-column layout when roadmap exists
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left column: roadmap */}
            <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    RoadMap <Bot className="inline-block ml-2" />
                </h2>
                <p className="text-gray-600 mb-6">
                    Update your role to regenerate the roadmap.
                </p>
                <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Your role for creation"
                    className="border border-gray-400 rounded-lg px-4 py-2 w-full outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <div onClick={generationData}>
                    <RoadmapButton />
                </div>
                </div>
          </div>

          {/* Right column: search/input */}
            <div className="flex-1">
                <RoadmapViewer links={links} />
            </div>

        </div>
      ) : (
        // Centered layout when no roadmap yet
        <section className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">
              RoadMap <Bot className="inline-block ml-2" />
            </h1>
            <p className="text-gray-600 mb-6">
              See how the AI builds a personalized roadmap for you.
            </p>
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
      )}
    </div>
  );
};

export default GenerateRoadmap;
