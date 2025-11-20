import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cog, View, LineSquiggle, RefreshCcw } from "lucide-react";
import Cookies from "js-cookie";
import UserNameCard from '../components/UserNameCard';
import GenRoles from '../components/genRoles-homepage';
import HomeLoader from '../components/roles-page';

const Home = () => {
  const [user, setUser] = useState({ username: '', email: '', _id: '', skills: [] });
  const [recommendedRoles, setRecommendedRoles] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Loader state
  const [showLoader, setShowLoader] = useState(false);

  // Load cached recommendations
  useEffect(() => {
    const cached = JSON.parse(sessionStorage.getItem("allReadyRecommended") || "[]");
    if (cached.length) setRecommendedRoles(cached);
  }, []);

  // Fetch user profile
  useEffect(() => {
    if (!sessionStorage.getItem("reload")) {
      sessionStorage.setItem("reload", "true");
      window.location.reload();
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("https://skill-gap-matcher-ai.onrender.com/api/users/profile", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok || !data.user) return;
        setUser(data.user);
        sessionStorage.setItem('userData', JSON.stringify(data.user));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch recommendations when user has skills
  useEffect(() => {
    if (user.skills.length && !sessionStorage.getItem("recommendationsFetched")) {
      fetchRecommendations();
      sessionStorage.setItem("recommendationsFetched", "true");
    }
  }, [user.skills]);

  // Fetch AI recommendations
  const fetchRecommendations = async () => {
    if (!user.skills.length) return; // Don't fetch if no skills

    setShowLoader(true); // Show loader only when fetching
    setLoadingRecommendations(true);

    try {
      const skillsArray = user.skills.map(s => `${s.name}: ${s.level}`);
      const res = await fetch("https://ai-job-assistant-kj06.onrender.com/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsArray }),
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setRecommendedRoles(data);
        sessionStorage.setItem("allReadyRecommended", JSON.stringify(data));
      } else {
        console.error("Invalid AI response:", data);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoadingRecommendations(false);
      setShowLoader(false); // Hide loader after fetching
    }
  };

  const handleEdit = () => {
    Cookies.set("editData", JSON.stringify(user), { expires: 1 });
  };

  return (
    <div className="flex bg-gray-50">

      {/* Loader */}
      {showLoader && user.skills.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
          <HomeLoader />
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-60 p-8 bg-white shadow-md">
        <nav className="flex flex-col gap-4 text-gray-700 font-semibold">
          <Link to="/profile-edit" onClick={handleEdit} className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition">
            <Cog className="w-5 h-5" /> Edit Profile
          </Link>
          <Link to="/roles" className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition">
            <View className="w-5 h-5" /> View All Roles
          </Link>
          <Link to="/generate/roadmap" className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition">
            <LineSquiggle className="w-5 h-5" /> Generate Roadmap
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="grow p-8">
        <UserNameCard name={user?.username} mail={user?.email} />

        {/* User Skills */}
        <section className="mb-8 mt-12 border border-purple-200 p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-purple-900">Your Skills</h2>
          {user.skills?.length ? (
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {user.skills.map(({ _id, name, level }) => (
                <li key={_id} className="flex justify-between items-center bg-purple-50 border border-purple-100 px-4 py-2 rounded-md">
                  <span className="text-purple-800 font-medium">{name}</span>
                  <span className="text-sm text-gray-600">{level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills added yet.</p>
          )}
        </section>

        {/* Recommended Roles */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">AI Recommended Roles</h2>
            {user.skills.length > 0 && (
              <button
                onClick={fetchRecommendations}
                disabled={loadingRecommendations}
                className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-gray-700 rounded-full shadow-md hover:cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCcw size={18} className={loadingRecommendations ? "animate-spin" : ""} />
                {loadingRecommendations ? "Refreshing..." : "Reload"}
              </button>
            )}
          </div>

          {user.skills.length > 0 ? (
            recommendedRoles.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedRoles.map(({ job_title, match_percentage, reason }) => (
                  <div key={job_title} className="relative group p-4 bg-white shadow rounded-lg border border-purple-200 hover:shadow-md transition cursor-pointer">
                    <h3 className="font-bold text-purple-900 mb-2">{job_title}</h3>
                    <p><strong>Match:</strong> {match_percentage}%</p>

                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-3 w-64 bg-purple-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 shadow-lg z-10">
                      <div className="px-3 py-2">{reason}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-purple-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <GenRoles />
            )
          ) : (
            <p className="text-gray-500 italic">Add skills to see AI recommended roles.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
