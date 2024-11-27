// src/pages/DashboardPage.jsx
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert("Error fetching dashboard data");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>
      {dashboardData ? (
        <div>
          <p>Email: {dashboardData.email}</p>
          <p>Total Notes: {dashboardData.total_notes}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
