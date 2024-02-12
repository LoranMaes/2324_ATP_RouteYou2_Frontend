import React from "react";
import AppHeader from "@/app/components/molecules/AppHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import { post } from "../src/services/http.service";
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));
jest.mock("../src/services/http.service", () => ({
  post: jest.fn(),
}));

describe("AppHeader Component", () => {
  it("renders correctly", () => {
    render(<AppHeader />);
    expect(
      screen.getByRole("img", { name: "Logo of RouteYou" })
    ).toBeInTheDocument();
  });
  it("renders link", () => {
    render(<AppHeader />);
    const link = screen.getByRole("link", { name: "Plan a route" });
    expect(link).toBeInTheDocument();
  });
  it("User can go to the login page", () => {
    render(<AppHeader />);
    const button = screen.getByRole("link", { name: "Log in" });
    expect(button).toHaveAttribute("href", "/login");
  });
});
