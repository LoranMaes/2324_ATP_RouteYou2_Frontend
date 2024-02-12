import React from "react";
import { render, screen } from "@testing-library/react";
import SkipLink from "@/app/components/atoms/SkipLink";

describe("SkipLink", () => {
  it("Should render correctly", () => {
    const props = {
      href: "#main",
      title: "Skip to main content",
    };

    render(<SkipLink {...props} />);
    const skiplink = screen.getByRole("link", {
      name: props.title,
      href: props.href,
    });

    expect(skiplink).toBeInTheDocument();
  });
});
