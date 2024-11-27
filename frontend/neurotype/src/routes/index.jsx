// src/routes/index.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NotesPage } from "../pages/NotesPage";
import { NoteDetailPage } from "../pages/NoteDetailPage";
import { RecommendationsPage } from "../pages/RecommendationsPage";
import { DataExportPage } from "../pages/DataExportPage";
import { SelectPlanPage } from "../pages/SelectPlanPage";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

export const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/select-plan"
          element={
            <PrivateRoute>
              <SelectPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:noteId"
          element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <PrivateRoute>
              <RecommendationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/data/export"
          element={
            <PrivateRoute>
              <DataExportPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
