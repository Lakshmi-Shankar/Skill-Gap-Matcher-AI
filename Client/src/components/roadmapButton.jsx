import React from "react";

const RoadmapButton = () => {
  return (
    <div className="relative group inline-block">
      {/* Main button */}
      <div className="bg-yellow-200 hover:bg-yellow-100 py-2 px-5 rounded-md shadow-lg hover:shadow-xl flex justify-center items-center gap-3 cursor-pointer transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 14"
          height={25}
          width={25}
        >
          <path
            fill="#FFA000"
            d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z"
          />
          <path
            fill="#FFCA28"
            d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z"
          />
        </svg>
        <p className="font-bold text-gray-900 text-sm md:text-base">
          Build Roadmap
        </p>
      </div>

      {/* Dropdown */}
      <div className="absolute left-0 mt-2 w-64 md:w-72 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-500 z-50">
        <ul className="p-4 space-y-1">
          <li className="py-1 font-semibold text-gray-700">⚙️ How AI Builds It</li>
          <ul className="list-none p-0 m-0 space-y-1">
            <li className="pl-4 py-1 flex items-center gap-2">📁 Understand</li>
            <li className="pl-4 py-1 flex items-center gap-2">📁 Analyze
              <span className="pl-4 text-gray-500">📄 Find gaps</span>
            </li>
            <li className="pl-4 py-1 flex items-center gap-2">📁 Plan</li>
            <li className="pl-4 py-1 flex items-center gap-2">📁 Suggest</li>
            <li className="pl-4 py-1 flex items-center gap-2">📁 Deliver
              <span className="pl-4 text-gray-500">📄 Final roadmap</span>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default RoadmapButton;
