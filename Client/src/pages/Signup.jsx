import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const name = firstName + " " + lastName;

  try {
    const signupPromise = axios.post("http://localhost:3000/api/users/signup", {
      username,
      email,
      password,
    });

    toast.promise(signupPromise, {
      pending: "Signing up...",
      success: "Signup successful!",
      error: "Signup failed!",
    });

    const response = await signupPromise;
    console.log(response.data);
    navigate('/login');

  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />
      <form className="flex flex-col gap-3  border p-10 rounded-2xl">
        <p className="text-2xl text-purple-600 font-semibold tracking-tight flex items-center pl-8 relative">
          Register
          <span className="absolute left-0 w-4 h-4 bg-purple-600 rounded-full"></span>
          <span className="absolute left-0 w-4 h-4 bg-purple-600 rounded-full animate-ping"></span>
        </p>

        <p className="text-gray-600 text-sm">Signup now and get full access to our app.</p>

        <div className="flex gap-2">
          <label className="relative w-full">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500" />
            <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
              Firstname
            </span>
          </label>

          <label className="relative w-full">
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500" />
            <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
              Lastname
            </span>
          </label>
        </div>

        <label className="relative">
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500" />
          <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
            Email
          </span>
        </label>

        <label className="relative">
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500" />
          <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
            Password
          </span>
        </label>

        <label className="relative">
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500" />
          <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
            Confirm password
          </span>
        </label>

        <button type="submit" onClick={handleSubmit} className="border-none outline-none bg-purple-600 py-2.5 rounded-lg text-white text-base transition hover:bg-purple-700">
          Submit
        </button>

        <p className="text-gray-600 text-sm text-center">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Signin</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
