import React from "react";
import { render, screen } from "@testing-library/react";

import UserAvatar from "@/app/components/atoms/UserAvatar";

describe("UserAvatar Component", () => {
  it("renders correctly", () => {
    const userName = "John Doe";
    const imageUrl = "https://example.com/avatar.jpg";

    render(<UserAvatar userName={userName} imageUrl={imageUrl} />);

    const imageElement = screen.getByAltText(`Avatar for ${userName}`);
    expect(imageElement).toBeInTheDocument();
  });

  it("renders UserAvatar component with default avatar when no ImageUrl is provided", () => {
    const userName = "John Doe";

    render(<UserAvatar userName={userName} />);

    const imageElement = screen.getByAltText(`Default Avatar for ${userName}`);
    expect(imageElement).toBeInTheDocument();
  });
});
