import React, { useState, useEffect } from 'react';
import { User, Mail, Award, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const EditProfile = () => {
  const cookieData = Cookies.get("editData");
  const parsedData = cookieData ? JSON.parse(cookieData) : {};
  const { _id: id, username: initialName, email: initialEmail, skills: initialSkills } = parsedData;

  const [username, setUsername] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [skills, setSkills] = useState(initialSkills || []);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const addSkill = (e) => {
    e.preventDefault();
    if (!skillName || !skillLevel) return;
    setSkills([...skills, { name: skillName, level: skillLevel }]);
    setSkillName('');
    setSkillLevel('');
  };

  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
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
        toast.success("Profile updated successfully!");
        Cookies.remove("editData");
      } else toast.error("Error updating profile");
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
    <div className="max-h-screen flex items-center justify-center p-4 rounded-2xl">
      <ToastContainer position="bottom-left" autoClose={5000} />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="bg-gray-900 p-8 text-white rounded-2xl">
          <h2 className="text-3xl font-bold mb-2">Edit Profile</h2>
          <p className="text-purple-100">Keep your information up to date</p>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <p
                type="email"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder={email}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
              >
                {email}
              </p>
              
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Skills & Expertise</h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300"
                />
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-gray-300"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button onClick={addSkill} className="bg-gray-900 text-white px-6 py-2.5 rounded-lg">
                  Add Skill
                </button>
              </div>
            </div>

            {skills.length > 0 && (
              <div className="space-y-2">
                {skills.map((skill, i) => (
      <div
  key={i}
  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 
             hover:shadow-md hover:bg-purple-50 transition-all duration-200"
>
  <span className="font-medium text-gray-800">{skill.name}</span>
  <div className="flex items-center gap-3">
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}
    >
      {skill.level}
    </span>
    <button
      onClick={() => removeSkill(i)}
      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
</div>

                ))}
              </div>
            )}
          </div>

          <button onClick={handleSubmit} className="w-full text-white bg-gray-900 font-semibold py-3.5 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
