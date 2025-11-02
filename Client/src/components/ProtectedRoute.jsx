import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // your axios instance with baseURL and withCredentials

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/users/profile") // backend verifies JWT from cookie
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}