import React from 'react';

const RoadmapButton = () => {
  return (
    <div className="relative group inline-block">
      <div className="bg-white py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-4 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 14" height={25} width={25}>
          <path fill="#FFA000" d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z" />
          <path fill="#FFCA28" d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z" />
        </svg>
        <p>Build Roadmap</p>
      </div>
      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <ul className="p-4 space-y-1">
            <li className="py-1">⚙️ How AI Builds It</li>
                <ul className="list-none p-0 m-0">
                <li className="pl-4 py-1">📁 Understand</li>
                {/* <li className="pl-8 py-1">📄 Read your skills</li> */}

                <li className="pl-4 py-1">📁 Analyze</li>
                <li className="pl-8 py-1">📄 Find gaps</li>

                <li className="pr-3 py-1">📁 Plan</li>
                {/* <li className="pl-8 py-1">📄 Create steps</li> */}

                <li className="pl-4 py-1">📁 Suggest</li>
                {/* <li className="pl-8 py-1">📄 Add resources</li> */}

                <li className="pl-4 py-1">📁 Deliver</li>
                <li className="pl-8 py-1">📄 Final roadmap</li>
                </ul>
        </ul>
      </div>
    </div>
  );
}

export default RoadmapButton;
