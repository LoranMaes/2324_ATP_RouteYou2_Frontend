import React from "react";
import { render, screen } from "@testing-library/react";
import ShareWrapper from "@/app/components/atoms/ShareWrapper";

describe("ShareWrapper", () => {
  it("renders a ShareWrapper component", () => {
    render(<ShareWrapper />);

    const shareButtonList = screen.getByRole("list");
    expect(shareButtonList).toBeInTheDocument();

    const shareButtons = screen.getAllByRole("listitem");
    expect(shareButtons).toHaveLength(4);

    const facebookShareButton = screen.getByRole("button", {
      name: "share-on-facebook",
    });
    expect(facebookShareButton).toBeInTheDocument();
    const twitterShareButton = screen.getByRole("button", {
      name: "share-on-twitter",
    });
    expect(twitterShareButton).toBeInTheDocument();
    const linkedinShareButton = screen.getByRole("button", {
      name: "share-on-linkedin",
    });
    expect(linkedinShareButton).toBeInTheDocument();
    const whatsappShareButton = screen.getByRole("button", {
      name: "share-on-whatsapp",
    });
    expect(whatsappShareButton).toBeInTheDocument();
  });
});
