import React from "react";
import { render, screen } from "@testing-library/react";
import AppToggle from "@/app/components/atoms/AppToggle";

describe("AppToggle Component", () => {
  it("renders correctly", () => {
    render(
      <AppToggle
        name="isPaidEvent"
        label="This is a paid event"
        register={() => {}}
      />,
    );

    expect(screen.getByLabelText("This is a paid event")).toBeInTheDocument();
  });

  it("renders correctly default checked", () => {
    render(
      <AppToggle
        name="isPaidEvent"
        label="This is a paid event"
        register={() => {}}
        checked
      />,
    );

    expect(screen.getByLabelText("This is a paid event")).toBeChecked();
  });
});
