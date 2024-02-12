import React from "react";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchPage from "@/app/search/page";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SWRConfig, useSWRConfig } from "swr";
import HttpService from "../src/services/http.service";

jest.mock("next/navigation");
jest.mock("../src/services/http.service");
const pushMock = jest.fn();
jest.mock("next/navigation");
useRouter.mockReturnValue({
  push: pushMock,
});
usePathname.mockReturnValue("/search");

describe("Event search Page", () => {
  it("Search page renders correctly", async () => {
    useSearchParams.mockReturnValue({
      get: () => {},
      entries: () => [],
    });

    HttpService.get.mockResolvedValue({
      data: {
        events: [
          {
            id: 1,
            slug: "canyon-social-ride-1",
            title: "Canyon Social Ride 2024",
            description: "Test Description",
            start: "2024-05-07 14:03:28",
            end: "2024-05-08 15:17:06",
            status: "UPCOMING",
            street: "Dendermondsesteenweg",
            going_count: 0,
            participations: [],
            zip: 9000,
            number: 25,
            city: "Gent",
            image: null,
          },
          {
            id: 2,
            slug: "canyon-social-ride-2",
            title: "Canyon Social Ride 2023",
            description: "Test Description",
            start: "2023-05-07 14:03:28",
            end: "2023-05-08 15:17:06",
            status: "FINISHED",
            street: "Dendermondsesteenweg",
            going_count: 0,
            participations: [],
            zip: 9000,
            number: 25,
            city: "Gent",
            image: null,
          },
        ],
      },
    });

    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
          <SearchPage />
        </SWRConfig>
      );
    });

    // await waitForElementToBeRemoved(() => screen.getAllByText("Loading..."));
    // Check if SearchPage has correct h1 title
    const pageTitle = screen.getByText("Search for an event");
    expect(pageTitle).toBeInTheDocument();
    //Check if pageTitle is h1
    expect(pageTitle.tagName).toBe("H1");

    const pageSubTitleFilters = screen.getByText("Filters");
    expect(pageSubTitleFilters).toBeInTheDocument();
    expect(pageSubTitleFilters.tagName).toBe("H2");

    const pageSubTitleResults = screen.getByText("Results");
    expect(pageSubTitleResults).toBeInTheDocument();
    expect(pageSubTitleResults.tagName).toBe("H2");

    // Check if SearchPage has form with role search
    const searchForm = screen.getByRole("search");
    expect(searchForm).toBeInTheDocument();
    // Check if input has label
    const label = screen.getByLabelText("Name of the event");
    expect(label).toBeInTheDocument();

    // Check if SearchPage has button with role button
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.textContent).toBe("Search");
  });

  it("Search page renders filters correctly", async () => {
    const user = userEvent.setup();

    HttpService.get.mockResolvedValue({
      data: {
        events: [
          {
            id: 1,
            slug: "canyon-social-ride-1",
            title: "Canyon Social Ride 2024",
            description: "Test Description",
            start: "2024-05-07 14:03:28",
            end: "2024-05-08 15:17:06",
            status: "UPCOMING",
            street: "Dendermondsesteenweg",
            going_count: 0,
            participations: [],
            zip: 9000,
            number: 25,
            city: "Gent",
            image: null,
          },
          {
            id: 2,
            slug: "canyon-social-ride-2",
            title: "Canyon Social Ride 2023",
            description: "Test Description",
            start: "2023-05-07 14:03:28",
            end: "2023-05-08 15:17:06",
            status: "FINISHED",
            street: "Dendermondsesteenweg",
            going_count: 0,
            participations: [],
            zip: 9000,
            number: 25,
            city: "Gent",
            image: null,
          },
        ],
      },
    });

    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
          <SearchPage />
        </SWRConfig>
      );
    });
    const showFiltersButton = screen.getByRole("button", {
      name: "Toggle filters",
    });

    // Check if filters are hidden
    let filterOrganisationName = screen.queryByLabelText("Organisation name");
    let filterStartDate = screen.queryByLabelText("Start date");
    let filterEndDate = screen.queryByLabelText("End date");
    let filterMaxParticipants = screen.queryByLabelText("Max participants");
    let filterIsPaidEvent = screen.queryByLabelText("This is a paid event");
    let filterPrice = screen.queryByLabelText("Max price");

    expect(filterOrganisationName).not.toBeInTheDocument();
    expect(filterStartDate).not.toBeInTheDocument();
    expect(filterEndDate).not.toBeInTheDocument();
    expect(filterMaxParticipants).not.toBeInTheDocument();
    expect(filterIsPaidEvent).not.toBeInTheDocument();
    expect(filterPrice).not.toBeInTheDocument();

    // Check if filters are visible
    await user.click(showFiltersButton);

    filterOrganisationName = screen.getByLabelText("Organisation name");
    filterStartDate = screen.getByLabelText("Start date");
    filterEndDate = screen.getByLabelText("End date");
    filterMaxParticipants = screen.getByLabelText("Max participants");
    filterIsPaidEvent = screen.getByTestId("toggle-isPaidEvent");
    filterPrice = screen.queryByLabelText("Max price");

    expect(filterOrganisationName).toBeInTheDocument();
    expect(filterStartDate).toBeInTheDocument();
    expect(filterEndDate).toBeInTheDocument();
    expect(filterMaxParticipants).toBeInTheDocument();
    expect(filterIsPaidEvent).toBeInTheDocument();
    expect(filterPrice).not.toBeInTheDocument();

    await user.click(filterIsPaidEvent);

    filterPrice = screen.getByLabelText("Max price");

    expect(filterPrice).toBeInTheDocument();
  });

  it("Pushes correct search query to route with simple eventName filter", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
          <SearchPage />
        </SWRConfig>
      );
    });

    const filterEventName = screen.getByLabelText("Name of the event");
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });

    await user.type(filterEventName, "testEvent");

    await user.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith(`/search?title=testEvent`, {
      scroll: false,
    });
  });

  it("Pushes correct search query to route with complex filter", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
          <SearchPage />
        </SWRConfig>
      );
    });

    const filterEventName = screen.getByLabelText("Name of the event");
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });
    const showFiltersButton = screen.getByRole("button", {
      name: "Toggle filters",
    });

    await user.type(filterEventName, "testEvent");

    await user.click(showFiltersButton);

    const filterMaxParticipants = screen.getByLabelText("Max participants");
    const filterIsPaidEvent = screen.getByTestId("toggle-isPaidEvent");

    await user.type(filterMaxParticipants, "1000");

    await user.click(filterIsPaidEvent);
    const filterPrice = screen.getByLabelText("Max price");

    await user.type(filterPrice, "100");

    await user.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith(
      `/search?title=testEvent&max_participant=1000&price=100`,
      {
        scroll: false,
      }
    );
  });

  it("Should clear form inputs on click of reset filters button", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
          <SearchPage />
        </SWRConfig>
      );
    });

    const filterEventName = screen.getByLabelText("Name of the event");
    const searchButton = screen.getByRole("button", {
      name: "Search",
    });
    const showFiltersButton = screen.getByRole("button", {
      name: "Toggle filters",
    });

    await user.type(filterEventName, "testEvent");

    await user.click(showFiltersButton);

    const filterMaxParticipants = screen.getByLabelText("Max participants");
    const filterIsPaidEvent = screen.getByTestId("toggle-isPaidEvent");
    const resetFiltersButton = screen.getByRole("button", {
      name: "Reset filters",
    });
    await user.type(filterMaxParticipants, "1000");

    await user.click(filterIsPaidEvent);
    const filterPrice = screen.getByLabelText("Max price");

    await user.type(filterPrice, "100");

    await user.click(resetFiltersButton);

    await user.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith(`/search`, {
      scroll: false,
    });
  });
});
