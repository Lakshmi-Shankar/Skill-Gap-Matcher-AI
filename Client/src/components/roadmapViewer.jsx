import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const RoadmapViewer = ({ roadmap }) => {
  // Initialize an array of booleans for each step (all closed by default)
  const [openStates, setOpenStates] = useState([]);

  // Reset openStates whenever roadmap changes
  useEffect(() => {
    if (roadmap && roadmap.Steps) {
      setOpenStates(roadmap.Steps.map(() => false));
    }
  }, [roadmap]);

  const toggle = (i) => {
    setOpenStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  if (!roadmap || !roadmap.Steps) return null; // safety check

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#C2B280] rounded-xl shadow-lg font-mono">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#3A3A3A] border-b-4 border-[#6B4C3B] pb-2 tracking-wider text-center">
        🪓 Learning Crafting Table
      </h1>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        {roadmap.Steps.map((step, i) => {
          const isOpen = openStates[i];

          return (
            <div
              key={i}
              className="bg-[#E6D8AD] border-4 border-[#6B4C3B] rounded-md shadow-inner transition-all hover:shadow-lg cursor-pointer flex flex-col"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center p-3 bg-[#E6D8AD]"
              >
                <span className="font-bold text-[#3A3A3A]">
                  Step {step.order}
                </span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-80 p-3" : "max-h-0 p-0"
                }`}
              >
                <p className="text-sm text-[#3A3A3A] whitespace-pre-line">
                  {step.description}
                </p>
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 block"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resources */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-[#3A3A3A] border-t-4 border-[#6B4C3B] pt-3 tracking-wide text-center">
        🛠️ Resources
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        {roadmap.Links.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E6D8AD] border-4 border-[#6B4C3B] rounded-md shadow-inner p-3 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <p className="font-bold text-[#3A3A3A]">{item.topic}</p>
            <p className="text-sm text-[#3A3A3A] mt-2">Open →</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RoadmapViewer;
