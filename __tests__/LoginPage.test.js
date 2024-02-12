import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";
import { login } from "../src/services/auth.service";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../src/services/auth.service", () => ({
  login: jest.fn(() => Promise.resolve({ message: "Logged in" })),
}));

describe("Login Page", () => {
  it("renders correctly", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("can log a user in", async () => {
    const events = userEvent.setup();

    render(<LoginPage />);

    const email = screen.getByLabelText("Email*");
    const password = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    await events.type(email, "test@tester.com");
    await events.type(password, "Azerty123");
    await events.click(loginButton);

    expect(login).not.toHaveBeenCalledTimes(1);
  });

  it("can deny when a user fills in a wrong password", async () => {
    const events = userEvent.setup();

    render(<LoginPage />);

    const email = screen.getByLabelText("Email*");
    const password = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    await events.type(email, "test@tester.com");
    await events.type(password, "Azerty123!");
    await events.click(loginButton);

    expect(login).toHaveBeenCalledWith("test@tester.com", "Azerty123!");
  });
});
