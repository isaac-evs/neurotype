import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./pages/mainLayout";
import { useState } from "react";
import LoginLayout from "./layouts/loginLayout";


function App() {
  // Simulamos si el usuario está autenticado.
  const [isAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Ruta del Login */}
        <Route path="/login" element={<LoginLayout />} />

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