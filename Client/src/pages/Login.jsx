import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const loginPromise = axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      }, { withCredentials: true });

      toast.promise(loginPromise, {
        pending: "Logging in...",
        success: "Login successful!",
        error: "Login failed!",
      });

      const response = await loginPromise;
      console.log(response.data);
      setInterval(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 border p-10 rounded-2xl"
      >
        <p className="text-2xl text-purple-600 font-semibold tracking-tight flex items-center pl-8 relative">
          Login
          <span className="absolute left-0 w-4 h-4 bg-purple-600 rounded-full"></span>
          <span className="absolute left-0 w-4 h-4 bg-purple-600 rounded-full animate-ping"></span>
        </p>

        <p className="text-gray-600 text-sm">Login now and get full access to our app.</p>

        <label className="relative">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500"
          />
          <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
            Email
          </span>
        </label>

        <label className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="peer w-full p-2.5 pb-5 border border-gray-400 border-opacity-40 rounded-lg outline-none focus:border-purple-500"
          />
          <span className="absolute left-3 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-sm peer-focus:top-9 peer-valid:top-9 peer-focus:text-xs peer-focus:font-semibold peer-valid:text-green-600">
            Password
          </span>
        </label>

        <button
          type="submit"
          className="border-none outline-none bg-purple-600 py-2.5 rounded-lg text-white text-base transition hover:bg-purple-700"
        >
          Submit
        </button>

        <p className="text-gray-600 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
