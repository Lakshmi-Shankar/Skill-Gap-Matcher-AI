import React, { useState } from 'react';
import { User, Mail, Award, Trash2, Check } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const { id, name, mail, userSkills } = location.state || {};

  const [username, setUsername] = useState(name || '');
  const [email, setEmail] = useState(mail || '');
  const [skills, setSkills] = useState(userSkills || []);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const addSkill = (e) => {
    e.preventDefault();
    if (!skillName || !skillLevel) return;
    setSkills([...skills, { name: skillName, level: skillLevel }]);
    setSkillName('');
    setSkillLevel('');
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ id, username, email, skills });

    try {

      if (!emailRegex.test(email)) {
        toast.error("Check the mail format");
        return;
      }
    

      const res1 = await fetch(`http://localhost:3000/api/users/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email }),
      });

      const res2 = await fetch(`http://localhost:3000/api/users/${id}/skills`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ skills }),
      });

      if (res1.ok && res2.ok) {
        setSaveSuccess(true);
        toast.success("Profile updated successfully!");
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        toast.error("Error updating profile");
      }
    } catch (err) {
      toast.error("Connection error");
      console.error("Error:", err);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-700';
      case 'Intermediate': return 'bg-purple-100 text-purple-700';
      case 'Advanced': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center p-4">
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-gray-900 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Edit Profile</h2>
          <p className="text-purple-100">Keep your information up to date</p>
        </div>

        <div className="p-8 space-y-6">

          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-purple-400 hover:shadow-md"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-purple-400 hover:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4 group">
              <Award className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">Skills & Expertise</h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g., JavaScript"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-purple-400 hover:shadow-md bg-white"
                />
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-white hover:border-purple-400 hover:shadow-md cursor-pointer"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  onClick={addSkill}
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 font-medium whitespace-nowrap"
                >
                  Add Skill
                </button>
              </div>
            </div>

            {skills.length > 0 ? (
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-purple-300 hover:shadow-md hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                      <span className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-200">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)} group-hover:scale-110 transition-transform duration-200`}>
                        {skill.level}
                      </span>
                      <button
                        onClick={() => removeSkill(i)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 p-1.5 rounded"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-default">
                <Award className="w-12 h-12 mx-auto mb-2 opacity-20 hover:opacity-40 transition-opacity duration-200" />
                <p>No skills added yet. Add your first skill above!</p>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full text-white bg-gray-900 font-semibold py-3.5 rounded-lg hover:bg-gray-800 hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 shadow-lg shadow-purple-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;