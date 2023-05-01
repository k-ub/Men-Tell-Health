import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Login } from "../pages/login";
import { useLogin } from "@refinedev/core";
import { CredentialResponse } from "../interfaces/google"; // Add this import


// Mock the useLogin hook
jest.mock("@refinedev/core", () => ({
  useLogin: jest.fn(),
}));

// Mock the Google One Tap sign-in
const mockGoogleInitialize = jest.fn();
const mockGoogleRenderButton = jest.fn();
(window as any).google = {
  accounts: {
    id: {
      initialize: mockGoogleInitialize,
      renderButton: mockGoogleRenderButton,
    },
  },
};

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Login component", () => {
    const mockLogin = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockLogin,
    });

    render(<Login />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls login mutation on successful Google One Tap sign-in", async () => {
    const mockLogin = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockLogin,
    });

    render(<Login />);

    const callback = mockGoogleInitialize.mock.calls[0][0].callback;

    const mockCredentialResponse: CredentialResponse = {
      credential: "mockCredential",
      // Add other properties as needed
    };

    await callback(mockCredentialResponse);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith(mockCredentialResponse);
    });
  });

  it("does not call login mutation if no credential is provided", async () => {
    const mockLogin = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockLogin,
    });

    render(<Login />);

    const callback = mockGoogleInitialize.mock.calls[0][0].callback;

    const mockCredentialResponse: CredentialResponse = {
      credential: undefined, // Change this from null to undefined
      // Add other properties as needed
    };

    await callback(mockCredentialResponse);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(0);
    });

    await callback(mockCredentialResponse);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(0);
    });
  });
});
