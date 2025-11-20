import React from "react";
import { Book, Code, Terminal, Rocket } from "lucide-react"; // icons for roadmap cards

const RoadmapTree = ({ links }) => {
  if (!links || links.length === 0) return null;

  const icons = [<Book />, <Code />, <Terminal />, <Rocket />]; // cycle through icons

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg font-mono">
      <h1
        className="text-3xl font-bold mb-8 text-gray-100 border-b-4 border-gray-700 pb-2 tracking-wider text-center"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        🛠️ Learning Roadmap
      </h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {links.map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 border-4 border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <div className="text-yellow-400 mb-2">
              {icons[i % icons.length]} {/* rotate icons */}
            </div>
            <p
              className="font-bold text-gray-100 text-center mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8rem" }}
            >
              {item.topic}
            </p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-1 bg-yellow-400 text-gray-900 font-bold text-xs rounded shadow-md hover:bg-yellow-300 transition-colors"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                OPEN
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTree;
