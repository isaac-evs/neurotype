// src/context/__tests__/AuthContext.test.jsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../AuthContext";
import axiosInstance from "../../api/axiosInstance";

// Mock axiosInstance
jest.mock("../../api/axiosInstance");

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("login function stores token and updates context", () => {
    const TestComponent = () => {
      const { token, login } = React.useContext(AuthContext);
      React.useEffect(() => {
        login("test_token");
      }, [login]);
      return <div>Token: {token}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("Token: test_token")).toBeInTheDocument();
    expect(localStorage.getItem("access_token")).toBe("test_token");
  });

  test("logout function clears token and updates context", () => {
    const TestComponent = () => {
      const { token, login, logout } = React.useContext(AuthContext);
      React.useEffect(() => {
        login("test_token");
        logout();
      }, [login, logout]);
      return <div>Token: {token}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("Token: null")).toBeInTheDocument();
    expect(localStorage.getItem("access_token")).toBeNull();
  });

  test("fetchUser sets user when token is valid", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    axiosInstance.get.mockResolvedValueOnce({ data: mockUser });

    const TestComponent = () => {
      const { user, login, loading } = React.useContext(AuthContext);
      React.useEffect(() => {
        login("valid_token");
      }, [login]);
      if (loading) return <div>Loading...</div>;
      return <div>User: {user.name}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(getByText("User: John Doe")).toBeInTheDocument(),
    );
    expect(axiosInstance.get).toHaveBeenCalledWith("/users/me", {
      headers: { Authorization: "Bearer valid_token" },
    });
  });

  test("fetchUser clears token on error", async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error("Unauthorized"));

    const TestComponent = () => {
      const { user, login, loading } = React.useContext(AuthContext);
      React.useEffect(() => {
        login("invalid_token");
      }, [login]);
      if (loading) return <div>Loading...</div>;
      return <div>User: {user ? user.name : "No User"}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(getByText("User: No User")).toBeInTheDocument());
    expect(localStorage.getItem("access_token")).toBeNull();
  });
});
