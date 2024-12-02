// src/pages/LoginPage.jsx

import React, { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { motion, AnimatePresence } from "framer-motion";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setGeneralError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);

      const response = await axiosInstance.post("/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      login(response.data.access_token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          const detail = error.response.data.detail;
          if (detail === "Invalid credentials.") {
            setGeneralError("Invalid email or password.");
          } else {
            setGeneralError("Login failed.");
          }
        } else {
          setGeneralError("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        setGeneralError(
          "No response from server. Please check your connection.",
        );
      } else {
        setGeneralError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-80"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl mb-4 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Input */}
          <div className="mb-4">
            <motion.input
              type="email"
              data-cy="email-input" // Added data-cy attribute
              className={`border p-2 w-full rounded ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Mark as required for accessibility
              whileFocus={{ borderColor: "#3B82F6", scale: 1.02 }}
            />
            {/* Email Error Message */}
            <AnimatePresence>
              {emailError && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <motion.input
              type="password"
              data-cy="password-input" // Added data-cy attribute
              className={`border p-2 w-full rounded ${
                generalError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Mark as required for accessibility
              whileFocus={{ borderColor: "#3B82F6", scale: 1.02 }}
            />
          </div>

          {/* General Error Message */}
          <AnimatePresence>
            {generalError && (
              <motion.p
                className="text-red-500 text-sm mb-4 text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {generalError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Login Button */}
          <motion.button
            className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition-colors"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <GoogleLoginButton /> {/* Add the Google Sign-In button */}
        </div>
      </motion.div>
    </div>
  );
};
