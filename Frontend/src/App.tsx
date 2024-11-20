import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import MainLayout from "./pages/mainLayout";
import { useState } from "react";

function App() {
  // Simulamos si el usuario está autenticado.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Ruta del Login */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />

        {/* Ruta protegida con un wrapper */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;