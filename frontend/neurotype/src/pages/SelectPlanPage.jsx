// src/pages/SelectPlanPage.jsx
import React, { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SelectPlanPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Retrieve the token from the context
  const [plan, setPlan] = useState("lite");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to the /select-plan endpoint with plan_in as a query parameter
      await axiosInstance.put(
        "/select-plan",
        {}, // Empty request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            plan_in: plan, // Include plan_in as a query parameter
          },
        },
      );
      alert("Plan selected successfully");
      navigate("/dashboard"); // Redirect to the dashboard after selecting a plan
    } catch (error) {
      console.error(
        "Plan selection error:",
        error.response?.data || error.message,
      );
      alert("Error selecting plan");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 text-center">Select Your Plan</h2>
        <select
          className="border p-2 w-full mb-4"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="lite">Lite</option>
          <option value="plus">Plus</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Confirm Plan
        </button>
      </form>
    </div>
  );
};
