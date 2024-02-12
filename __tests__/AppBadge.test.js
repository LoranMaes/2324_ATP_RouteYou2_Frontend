import React from "react";
import { render, screen } from "@testing-library/react";

import AppBadge from "@/app/components/atoms/AppBadge";

describe("AppBadge Component", () => {
  it("renders correctly", () => {
    const title = "Participant";

    render(<AppBadge title={title} />);

    const badgeElement = screen.getByText(title);
    expect(badgeElement).toBeInTheDocument();
  });

  it("renders correctly with default color values", () => {
    const title = "Participant";

    render(<AppBadge title={title} />);

    const badgeElement = screen.getByText(title).closest("span");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-primary-green");
    expect(badgeElement).toHaveClass("text-background");
  });

  it("Component correctly sets background color", () => {
    const title = "Participant";
    const bgColor = "bg-accent-yellow";

    render(<AppBadge title={title} bgColor={bgColor} />);

    const badgeElement = screen.getByText(title).closest("span");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-accent-yellow");
  });

  it("Component correctly sets text color", () => {
    const title = "Participant";
    const textColor = "text-primary-green";

    render(<AppBadge title={title} textColor={textColor} />);

    const badgeElement = screen.getByText(title).closest("span");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("text-primary-green");
  });
});
