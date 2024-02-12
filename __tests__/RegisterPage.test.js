import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "@/app/register/page";
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

describe("Register Page", () => {
  it("renders correctly", () => {
    render(<RegisterPage />);
    expect(screen.getByRole("button", { name: "Create an account" })).toBeInTheDocument();
  });

  it ("can register a user", async () => {
    const events = userEvent.setup();
    render(<RegisterPage />);

    
  })
});
