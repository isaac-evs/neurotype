// src/components/__tests__/GoogleLoginButton.test.jsx

// 1. Mock react-router-dom before importing it
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// 2. Mock axiosInstance before importing it
jest.mock("../../api/axiosInstance");

import React from "react";
import { render, waitFor } from "@testing-library/react";
import GoogleLoginButton from "../GoogleLoginButton";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { BrowserRouter } from "react-router-dom";

describe("GoogleLoginButton Component", () => {
  beforeEach(() => {
    // Mock the google accounts object
    window.google = {
      accounts: {
        id: {
          initialize: jest.fn(),
          renderButton: jest.fn(),
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Google Sign-In button", () => {
    const login = jest.fn();

    render(
      <AuthContext.Provider value={{ login }}>
        <BrowserRouter>
          <GoogleLoginButton />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    expect(window.google.accounts.id.initialize).toHaveBeenCalled();
    expect(window.google.accounts.id.renderButton).toHaveBeenCalledWith(
      expect.anything(),
      { theme: "outline", size: "large" },
    );
  });

  test("handles successful Google Sign-In", async () => {
    const login = jest.fn();
    const mockToken = "mock_access_token";
    const mockResponse = {
      data: {
        access_token: mockToken,
        is_new_user: false,
      },
    };

    // Mock the POST request to /auth/google
    axiosInstance.post.mockResolvedValueOnce(mockResponse);

    render(
      <AuthContext.Provider value={{ login }}>
        <BrowserRouter>
          <GoogleLoginButton />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    // Wait for initialize to be called
    await waitFor(() => {
      expect(window.google.accounts.id.initialize).toHaveBeenCalled();
    });

    // Access the callback from the initialize mock
    const initializeArgs =
      window.google.accounts.id.initialize.mock.calls[0][0];
    const credentialCallback = initializeArgs.callback;

    const response = { credential: "mock_id_token" };

    // Simulate the Google Sign-In callback
    credentialCallback(response);

    // Wait for the POST request to be called
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith("/auth/google", {
        id_token: "mock_id_token",
      });
    });

    // Verify that login was called with the mock token
    expect(login).toHaveBeenCalledWith(mockToken);
  });
});
