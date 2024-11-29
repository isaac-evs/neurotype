// src/components/GoogleLoginButton.jsx

import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "556952347377-ujs9djrl3t27lbtkvopn3u9fk61ot62j.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" },
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const { credential } = response;

    try {
      // Send the ID token to the backend
      const res = await axiosInstance.post("/auth/google", {
        id_token: credential,
      });

      // Store the token in AuthContext
      login(res.data.access_token);

      alert("Google Sign-In successful");

      if (res.data.is_new_user) {
        navigate("/select-plan");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Google Sign-In error:",
        error.response?.data || error.message,
      );
      alert("Error during Google Sign-In");
    }
  };

  return <div id="google-signin-button"></div>;
};

export default GoogleLoginButton;
