import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { Cog, View, LineSquiggle } from "lucide-react"
import { useEffect, useState } from 'react';
import BG from '../components/BG.jsx';
import UserNameCard from '../components/UserNameCard';

const Home = ({ recommendedRoles = [] }) => {

  const totalMatched = recommendedRoles.reduce((a, r) => a + r.match, 0);
  const avgMatch = (recommendedRoles.length ? totalMatched / recommendedRoles.length : 0).toFixed(1);
  const missingSkills = [...new Set(recommendedRoles.flatMap(r => r.missingSkills || []))];
  const [username, setUsername] = useState('');
  const [userskills, setUserskills] = useState([]);


  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        credentials: 'include', // sends cookies
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      console.log(data);
      setUsername(data.user.username);
      setUserskills(data.user.skills);
      console.log(data.user.skills);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

    fetchProfile();
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <BG /> */}
      {/* Sidebar */}
        <aside className="w-60 p-8 bg-white shadow-md">
        <nav className="flex flex-col gap-4 text-gray-700 font-semibold">
            <Link
            to="/profile/edit"
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

      {/* Main Content */}
      <main className="grow p-8 relative">
        {/* <h1 className="text-3xl font-bold mb-4 text-purple-900">
          Welcome back, {username}. Let’s bridge your skill gaps.
        </h1> */}
        <UserNameCard name={username} />


        {/* Skills */}
        <section className="mb-8 mt-12 border p-6">
          <h2 className="text-xl font-semibold mb-2">Your Skills</h2>
          {userskills.length ? (
            <ul className="space-y-1">
              {userskills.map(({ _id, name, level }) => (
                <li key={_id} className="text-purple-700">
                  {name} - <span className="font-medium">{level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No skills added yet.</p>
          )}
        </section>

        {/* Roles */}
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

        {/* Gap Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Gap Summary</h2>
          <p>Average Match: {avgMatch}%</p>
          <p>Unique Missing Skills: {missingSkills.join(', ') || 'None'}</p>
        </section>

        <Link
          to="/roadmap"
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Next Steps / View Roadmap
        </Link>
      </main>
    </div>
  );
};

export default Home;
