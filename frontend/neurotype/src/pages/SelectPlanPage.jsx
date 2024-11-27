// src/pages/SelectPlanPage.jsx
import React, { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SelectPlanPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [plan, setPlan] = useState("lite");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/select-plan", {
        plan: plan,
      });
      alert("Plan updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Plan selection error:", error);
      alert("Error updating plan");
    }
  };

  if (!token) {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 text-center">Select Plan</h2>
        <select
          className="border p-2 w-full mb-4"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="lite">Lite</option>
          <option value="plus">Plus</option>
        </select>
        <button
          className="bg-purple-500 text-white p-2 w-full rounded"
          type="submit"
        >
          Update Plan
        </button>
      </form>
    </div>
  );
};
