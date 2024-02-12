import React from "react";
import { render, screen } from "@testing-library/react";
import AppPopup from "../src/app/components/molecules/AppPopup";

describe("AppPopup component", () => {
  it("renders correctly closed", () => {
    render(<AppPopup isOpen={false}></AppPopup>);
    const popup = screen.queryByTestId("popup");
    expect(popup).toBeNull();
  }),
    it("renders correctly opened", () => {
      render(<AppPopup isOpen={true}></AppPopup>);
      const popup = screen.queryByTestId("popup");
      expect(popup).toBeVisible();
    }),
    it("renders correctly with text", () => {
      const data = [
        {
          name: "Bart",
        },
        {
          name: "Gert",
        },
        {
          name: "test naam",
        },
      ];
      render(<AppPopup isOpen={true} data={data}></AppPopup>);
      const popup = screen.queryByTestId("popup");
      expect(popup).toBeVisible();
      expect(popup).toHaveTextContent("Bart");
    });
});
