import React, { useEffect, useState } from "react";
import { MapPin, Building2, Calendar, Globe, Link, Search } from "lucide-react";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("https://skill-gap-matcher-ai.onrender.com/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch roles");
        const data = await response.json();
        setRoles(data);
        setFilteredRoles(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // Filter roles by search
  useEffect(() => {
    const filtered = roles.filter((role) =>
        (role.title && role.title.toLowerCase().includes(search.toLowerCase())) ||
        (role.job_type && role.job_type.toLowerCase().includes(search.toLowerCase())) ||
        (role.candidate_required_location && role.candidate_required_location.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredRoles(filtered);
  }, [search, roles]);

  // Fetch summary when a role is selected
  useEffect(() => {
    const fetchSummary = async () => {
      if (!selectedRole?.description) return;
      try {
        setLoadingSummary(true);
        setSummary("");
        const res = await fetch("https://text-summarizer-llm.onrender.com/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            choice: "one",
            text: selectedRole.description,
            mode: "very-short",
          }),
        });
        const data = await res.json();
        setSummary(data.summary || selectedRole.plain_description || "No summary available.");
      } catch (err) {
        console.error("Error fetching summary:", err);
        setSummary(selectedRole.plain_description || "Error generating summary.");
      } finally {
        setLoadingSummary(false);
      }
    };
    if (selectedRole) fetchSummary();
  }, [selectedRole]);

  // Loading state for roles
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Loading roles...</p>
        </div>
      </div>
    );

  // Show loading summary screen
  if (selectedRole && loadingSummary)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-serif text-gray-800">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Generating Summary...</h2>
          <p className="text-gray-600">
            Summarizing the role description for <strong>{selectedRole.title}</strong>
          </p>
          <button
            onClick={() => setSelectedRole(null)}
            className="mt-6 text-purple-600 hover:underline text-sm"
          >
            ← Back to roles
          </button>
        </div>
      </div>
    );

  // Detailed view
if (selectedRole)
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-[#fdfcf8] shadow-lg p-10 font-serif text-gray-900 antialiased">
        {/* Back Button */}
        <button
          onClick={() => setSelectedRole(null)}
          className="text-gray-800 hover:underline mb-6 font-medium text-sm tracking-wide"
        >
          ← Back to Roles
        </button>

        {/* Headline */}
        <header className="text-center mb-6 border-b-2 border-gray-300 pb-2">
          <h1 className="text-5xl font-black uppercase leading-tight tracking-wider text-gray-900">
            {selectedRole.title}
          </h1>
          <div className="text-sm text-gray-600 mt-2">
            {selectedRole.company_name && (
              <span className="mx-2">
                <Building2 size={14} className="inline mr-1" />
                {selectedRole.company_name}
              </span>
            )}
            <span className="mx-2">
              <MapPin size={14} className="inline mr-1" />
              {selectedRole.candidate_required_location || "N/A"}
            </span>
            <span className="mx-2">
              <Globe size={14} className="inline mr-1" />
              {selectedRole.job_type || "N/A"}
            </span>
            <span className="mx-2">
              <Calendar size={14} className="inline mr-1" />
              {new Date(selectedRole.publication_date).toLocaleDateString()}
            </span>
          </div>
        </header>

        {/* Summary Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 border-b border-gray-300 pb-1">
            Summary
          </h2>
          <p className="text-justify text-[16px] leading-relaxed tracking-wide">
            {summary || selectedRole.plain_description}
          </p>
        </section>

        {/* Full Description Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-1">
            Full Description
          </h2>
          <div
            className="columns-2 gap-8 text-justify text-[15px] leading-relaxed tracking-wide text-gray-800"
            dangerouslySetInnerHTML={{ __html: selectedRole.description }}
          />
        </section>

        {/* Footer / Source */}
        <footer className="flex justify-between items-center border-t border-gray-400 pt-3 text-sm text-gray-600">
          <a
            href={selectedRole.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            <Link size={14} /> View on Source
          </a>
          <span>
            Added on: {new Date(selectedRole.created_at).toLocaleString()}
          </span>
        </footer>
      </div>
    </div>
  );


  // Role listing
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Available Roles</h1>
        </div>

        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Search size={20} />
            <label htmlFor="search" className="sr-only">Search Roles</label>
          </div>
          <input
            id="search"
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-1/2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all placeholder-gray-400"
          />
        </div>


        {filteredRoles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No roles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role.job_id}
                onClick={() => setSelectedRole(role)}
                className="cursor-pointer border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:border-purple-200 transition-all duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{role.title}</h2>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {role.job_type || "N/A"}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span>{role.candidate_required_location || "N/A"}</span>
                </div>
                {role.company_name && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    <span>{role.company_name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;
