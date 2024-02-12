import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AppButton from "@/app/components/atoms/AppButton";
import { mdiIncognito } from "@mdi/js";

describe("AppButton component", () => {
  const onClick = jest.fn();

  it("renders with valid accent-red background color", () => {
    render(
      <AppButton handleClick={onClick} bg_color={"bg-accent-red"}>
        Click me
      </AppButton>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-accent-red");
  });

  it("renders with valid primary background color", () => {
    render(
      <AppButton handleClick={onClick} bg_color={"bg-primary"}>
        Click me
      </AppButton>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("renders with invalid background color", () => {
    render(
      <AppButton handleClick={onClick} bg_color={"bg-not-good-color"}>
        Click me
      </AppButton>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-primary-green");
  });

  it("handles click events", () => {
    render(<AppButton handleClick={onClick}>Click me</AppButton>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders with default background color", () => {
    render(<AppButton handleClick={() => {}}>Click me</AppButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("bg-primary-green");
  });
});
