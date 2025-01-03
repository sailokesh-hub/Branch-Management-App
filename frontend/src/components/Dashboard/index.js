import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: "Branch A", location: "Location 1" },
    { id: 2, name: "Branch B", location: "Location 2" },
  ]);
  const navigate = useNavigate();

  const deleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const editBranch = (id) => {
    // Handle editing branch logic here
  };

  useEffect(() => {
    const JwtToken = Cookies.get("jwt_token");
        if (!JwtToken) {
          navigate("/login")
        }
  })

  return (
    <div className="flex">
      {/* Side Panel */}
      <div className="w-1/4 bg-blue-100 p-4 min-h-screen">
        <h3 className="text-xl font-bold mb-4">Dashboard</h3>
        <ul>
          <li className="mb-2">
            <a href="/dashboard" className="text-blue-600">Branch Entry</a>
          </li>
          <li className="mb-2">
            <a href="/dashboard" className="text-blue-600">Branches List</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-6">Branch Management</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className="border-b">
                <td className="p-2">{branch.name}</td>
                <td className="p-2">{branch.location}</td>
                <td className="p-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => editBranch(branch.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => deleteBranch(branch.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
