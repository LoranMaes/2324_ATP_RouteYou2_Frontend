import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/create/page";
import Cookies from "js-cookie";
import HttpService from "@/services/http.service";
import { useRouter } from "next/router";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("../src/services/auth.service", () => ({
  login: jest.fn(() =>
    Promise.resolve({
      message: "The user has been authenticated successfully.",
      token: "7|sPVTl8htlEBioVnqSlGEweQ2pQY3tqFzls0davGW3a491af5",
    }).then((res) => Cookies.set("token", res.token))
  ),
}));

jest.mock("../src/services/http.service", () => ({
  post: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

describe("Create Event Page", () => {
  it("renders correctly", async () => {
    render(<Page />);

    expect(
      screen.getByRole("button", { name: "Create event" })
    ).toBeInTheDocument();
  });

  it("validates input fields", async () => {
    const events = userEvent.setup();
    render(<Page />);
    const nameLabel = screen.getByLabelText("Name of the event*");
    const createButton = screen.getByRole("button", { name: "Create event" });
    await events.type(nameLabel, "te");

    await events.click(createButton);
    expect(screen.getByText("This field is too short")).toBeInTheDocument();
  });

  it("can create an event", async () => {
    const events = userEvent.setup();
    render(<Page />);

    const name = screen.getByLabelText("Name of the event*");
    const description = screen.getByLabelText("Description*");
    const startDate = screen.getByLabelText("Start date*");
    const endDate = screen.getByLabelText("End date*");
    const participants = screen.getByLabelText("Participants*");
    const street = screen.getByLabelText("Street*");
    const house_number = screen.getByLabelText("House Number*");
    const city = screen.getByLabelText("City*");
    const zip_code = screen.getByLabelText("Zip code*");
    const badge_icon = screen.getByLabelText("Badge icon*");
    const banner_image = screen.getByLabelText("Select your banner image*");
    const createButton = screen.getByRole("button", { name: "Create event" });

    await events.type(name, "Test event");
    await events.type(description, "Test description, and a super nice event");
    await events.type(startDate, "2024-09-01 09:00");
    await events.type(endDate, "2024-09-02 09:00");
    await events.type(street, "Super nice street");
    await events.type(house_number, "12");
    await events.type(city, "Ghent");
    await events.type(zip_code, "9000");
    await events.type(participants, "5");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await userEvent.upload(badge_icon, file);
    await userEvent.upload(banner_image, file);

    await events.click(createButton);
    await waitFor(() => {
      expect(HttpService.post).toHaveBeenCalledTimes(1);
    });
  });

  // @TODO: Fix this test

  // it("can create an event with a price", async () => {
  //   const events = userEvent.setup();
  //   render(<Page />);

  //   const toggle = screen.getByRole("switch", { name: "This is a paid event" });
  //   await events.click(toggle);

  //   const name = screen.getByLabelText("Name of the event*");
  //   const description = screen.getByLabelText("Description*");
  //   const location = screen.getByLabelText("Address*");
  //   const startDate = screen.getByLabelText("Start date*");
  //   const endDate = screen.getByLabelText("End date*");
  //   const participants = screen.getByLabelText("Participants*");
  //   const price = screen.getByLabelText("Price*");
  //   const routeLinks = screen.getByLabelText("Route links");
  //   const createButton = screen.getByRole("button", { name: "Create event" });

  //   await events.type(name, "Test event");
  //   await events.type(startDate, "2024-09-01 09:00");
  //   await events.type(endDate, "2024-09-02 09:00");
  //   await events.type(description, "Test description");
  //   await events.type(location, "Test location 90904");
  //   await events.type(routeLinks, "https://www.routeyou.com/en-be/route/view/103586/mountain-bike-route/mountain-bike-kluisbergen-green-blue-red-loop");
  //   await events.type(participants, "5");
  //   await events.type(price, "10");
  //   await events.click(createButton);

  //   await waitFor(() => {
  //     expect(HttpService.post).toHaveBeenCalledWith("/events", {
  //       city: "90904",
  //       description: "Test description",
  //       end: "2024-09-02T09:00",
  //       max_participant: "5",
  //       number: "location",
  //       payment: "https://mollie.com",
  //       price: "10",
  //       route_ids: ["103586"],
  //       start: "2024-09-01T09:00",
  //       street: "Test",
  //       title: "Test event",
  //       visible: true,
  //       zip: undefined,
  //     });
  //   });
  // });
});
