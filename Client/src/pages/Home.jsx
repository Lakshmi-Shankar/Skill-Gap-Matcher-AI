import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cog, View, LineSquiggle } from "lucide-react";
import Cookies from "js-cookie";
import UserNameCard from '../components/UserNameCard';

const Home = ({ recommendedRoles = [] }) => {
  const totalMatched = recommendedRoles.reduce((a, r) => a + r.match, 0);
  const avgMatch = (recommendedRoles.length ? totalMatched / recommendedRoles.length : 0).toFixed(1);
  const missingSkills = [...new Set(recommendedRoles.flatMap(r => r.missingSkills || []))];

  const [user, setUser] = useState({ username: '', email: '', _id: '', skills: [] });

  useEffect(() => {

      if (!sessionStorage.getItem("reloaded")) {
          sessionStorage.setItem("reloaded", "true");
          window.location.reload();
      }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    Cookies.set("editData", JSON.stringify(user), { expires: 1 });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 p-8 bg-white shadow-md">
        <nav className="flex flex-col gap-4 text-gray-700 font-semibold">
          <Link
            to="/profile-edit"
            onClick={handleEdit}
            className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition"
          >
            <Cog className="w-5 h-5" /> Edit Profile
          </Link>
          <Link
            to="/roles"
            className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition"
          >
            <View className="w-5 h-5" /> View All Roles
          </Link>
          <Link
            to="/roadmap/generate"
            className="hover:text-purple-700 hover:bg-gray-100 flex items-center gap-3 px-3 py-2 rounded-md transition"
          >
            <LineSquiggle className="w-5 h-5" /> Generate Roadmap
          </Link>
        </nav>
      </aside>

      <main className="grow p-8 relative">
        <UserNameCard name={user.username} mail={user.email} />

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

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommended Roles</h2>
          {recommendedRoles.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedRoles.map(({ title, match, missingSkills }) => (
                <div key={title} className="p-4 bg-white shadow rounded-lg border border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-2">{title}</h3>
                  <p><strong>Match:</strong> {match}%</p>
                  <p><strong>Missing Skills:</strong> {missingSkills?.join(', ') || 'None'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No recommendations yet.</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Gap Summary</h2>
          <p>Average Match: {avgMatch}%</p>
          <p>Unique Missing Skills: {missingSkills.join(', ') || 'None'}</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
