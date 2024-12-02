// src/components/__tests__/PrivateRoute.test.jsx

// 1. Mock react-router-dom before importing it
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import PrivateRoute from "../PrivateRoute";
import { AuthContext } from "../../context/AuthContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("PrivateRoute Component", () => {
  test("renders child component when authenticated", () => {
    const authContextValue = {
      token: "valid_token",
      user: { name: "John Doe" },
      loading: false,
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <div>Protected Content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to login when not authenticated", () => {
    const authContextValue = {
      token: null,
      user: null,
      loading: false,
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <div>Protected Content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
