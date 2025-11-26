// Updated responsive Home component
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cog, View, LineSquiggle, RefreshCcw } from "lucide-react";
import Cookies from "js-cookie";
import UserNameCard from '../components/UserNameCard';
import GenRoles from '../components/genRoles-homepage';
import HomeLoader from '../components/roles-page';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [user, setUser] = useState({ username: '', email: '', _id: '', skills: [] });
  const [recommendedRoles, setRecommendedRoles] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const cached = JSON.parse(sessionStorage.getItem("allReadyRecommended") || "[]");
    if (cached.length) setRecommendedRoles(cached);
  }, []);

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

  const fetchRecommendations = async () => {
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
        toast.error("Failed to fetch recommendations");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleEdit = () => {
    Cookies.set("editData", JSON.stringify(user), { expires: 1 });
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />

      {/* Sidebar */}
      <aside className="w-full md:w-60 p-6 bg-white shadow-md md:h-screen md:sticky md:top-0">
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

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        <UserNameCard name={user?.username} mail={user?.email} />

        {/* Skills */}
        <section className="mb-8 mt-10 border border-purple-200 p-6 rounded-lg bg-white shadow-sm">
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
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">AI Recommended Roles</h2>
            <button
              onClick={fetchRecommendations}
              disabled={loadingRecommendations}
              className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-gray-700 rounded-full shadow-md hover:bg-gray-900 disabled:opacity-50 transition"
            >
              <RefreshCcw size={18} className={loadingRecommendations ? "animate-spin" : ""} />
              {loadingRecommendations ? "Generating..." : "Generate"}
            </button>
          </div>

          {loadingRecommendations ? (
            <GenRoles />
          ) : recommendedRoles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRoles.map(({ job_title, match_percentage, reason }) => (
                <div key={job_title} className="relative group p-4 bg-white shadow rounded-lg border border-purple-200 hover:shadow-md transition cursor-pointer">
                  <h3 className="font-bold text-purple-900 mb-2">{job_title}</h3>
                  <p><strong>Match:</strong> {match_percentage}%</p>

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 bg-purple-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 duration-300 shadow-lg">
                    <div className="px-3 py-2">{reason}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-t-purple-900 border-l-transparent border-r-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-24 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
              <p className="text-sm font-medium">No recommendations yet</p>
              <p className="text-xs">Click the “Generate” button to get AI-based roles</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;