import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const JwtToken = Cookies.get("jwt_token");
    if (JwtToken) {
      navigate("/dashboard")
    }
  })

  const OnSubmitSuccess = token => {
    Cookies.set("jwt_token", token)
    navigate("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("Please fill in all fields.");
        return;
    }

    try {
        // Use POST for sending login data
        const response = await axios.post("https://branch-management-app-1.onrender.com/api/users/login", {
            email,
            password,
        });

        if (response.status === 200) {
            // Call the success handler with the JWT token
            OnSubmitSuccess(response.data.jwt_token);
        } else {
            console.log("Error: " + response.status);
            setError("Email and password are Incorrect")
        }
    } catch (error) {
        if (error.response) {
            // Log backend-provided error message
            console.error("Error response data:", error.response.data);
        } else {
            console.error("Error message:", error.message);
        }
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
