import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie'
import Login from "./components/LoginPage";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user details (use real authentication logic here)
    const storedUser = Cookies.get("jwt_token") !== undefined
     if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
