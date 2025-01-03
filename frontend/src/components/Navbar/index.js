import React from "react";
import { Link } from "react-router-dom";
import Cookies  from 'js-cookie';

const Navbar = ({ isLoggedIn, user }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Branch Management</h1>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <li className="font-medium">Welcome, {user?.name || "User"}!</li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={() => {
                  Cookies.remove("jwt_token")
                }}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
