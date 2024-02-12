import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppSearchBar from "@/app/components/atoms/AppSearchBar.jsx";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("AppSearchBar Component", () => {
  it("renders correctly", () => {
    render(<AppSearchBar placeholder={"Search a route"} />);
    expect(screen.getByPlaceholderText("Search a route")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<AppSearchBar placeholder={"Search a route"} />);

    const input = screen.getByPlaceholderText("Search a route");
    await user.type(input, "Sample route");
    expect(input).toHaveValue("Sample route");
  });
});
