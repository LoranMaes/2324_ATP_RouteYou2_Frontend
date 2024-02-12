import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import HttpService from "../src/services/http.service";
import DashboardPage from "@/app/page";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { DateTime } from "luxon";

jest.mock("../src/services/http.service");
jest.mock("next/navigation");

useSearchParams.mockReturnValue({
  get: () => {},
  entries: () => [],
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

const now = DateTime.now();
const nowDateTime = now.toISODate();
const futureDateTime = now.plus({ years: 100 }).toISODate();

describe("Event Dashboard Page", () => {
  it("renders correctly with initial data", async () => {
    HttpService.get.mockResolvedValue(testResponseAllEvents);

    await act(async () => {
      render(<DashboardPage />);
    });

    expect(HttpService.get).toHaveBeenCalledWith(
      `/events?&end=${futureDateTime}&paginate=8`
    );

    const pageTabList = screen.getByRole("tablist");
    expect(pageTabList).toBeInTheDocument();

    const pageTitle = screen.getByText("Event Dashboard");
    expect(pageTitle).toBeInTheDocument();
    //Check if pageTitle is h1
    expect(pageTitle.tagName).toBe("H1");

    const pageTabs = screen.getAllByRole("tab");
    expect(pageTabs).toHaveLength(4);
    expect(pageTabs[0]).toHaveTextContent("All Events");
    expect(pageTabs[1]).toHaveTextContent("Upcoming Events");
    expect(pageTabs[2]).toHaveTextContent("Past Events");
    expect(pageTabs[3]).toHaveTextContent("My Events");

    const pageTabPanels = screen.getAllByRole("tabpanel");
    expect(pageTabPanels).toHaveLength(1);

    // Check that the first tab is initially selected
    expect(pageTabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("handles tab click", async () => {
    const events = userEvent.setup();
    await act(async () => {
      render(<DashboardPage />);
    });
    const pageTabs = screen.getAllByRole("tab");

    // Click the second tab
    await events.click(pageTabs[1]);
    expect(pageTabs[1]).toHaveAttribute("aria-selected", "true");
    expect(pageTabs[0]).toHaveAttribute("aria-selected", "false");
  });

  test("fetches upcoming events when clicking on the 'Upcoming Events' tab", async () => {
    const events = userEvent.setup();

    HttpService.get.mockResolvedValue(testResponseUpcomingEvents);

    await act(async () => {
      render(<DashboardPage />);
    });
    const pageTabs = screen.getAllByRole("tab");

    await events.click(pageTabs[1]);

    expect(HttpService.get).toHaveBeenCalledWith(`/events?&paginate=8`);

    expect(pageTabs[1]).toHaveAttribute("aria-selected", "true");
    expect(pageTabs[0]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Canyon Social Ride 2024")).toBeInTheDocument();
  });

  test("fetches past events when clicking on the 'Past Events' tab", async () => {
    const events = userEvent.setup();

    HttpService.get.mockResolvedValue(testResponsePastEvents);

    await act(async () => {
      render(<DashboardPage />);
    });

    const pageTabs = screen.getAllByRole("tab");

    await events.click(pageTabs[2]);

    expect(HttpService.get).toHaveBeenCalledWith(
      `/events?end=${nowDateTime}&paginate=8`
    );

    expect(pageTabs[2]).toHaveAttribute("aria-selected", "true");
    expect(pageTabs[0]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Canyon Social Ride 2022")).toBeInTheDocument();
  });

  test("fetches user events when clicking on the 'My Events' tab", async () => {
    const events = userEvent.setup();

    HttpService.get.mockResolvedValue(testResponseMyEvents);

    await act(async () => {
      render(<DashboardPage />);
    });

    const pageTabs = screen.getAllByRole("tab");

    await events.click(pageTabs[3]);

    expect(HttpService.get).toHaveBeenCalledWith(`/user/events?paginate=8`);

    expect(pageTabs[3]).toHaveAttribute("aria-selected", "true");
    expect(pageTabs[0]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("User event")).toBeInTheDocument();
  });
});

const testResponseAllEvents = {
  data: {
    message: "The events have been returned successfully",
    events: {
      current_page: 1,
      data: [
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
      first_page_url: "http://10.129.23.206:8080/api/events?page=1",
      from: null,
      last_page: 1,
      last_page_url: "http://10.129.23.206:8080/api/events?page=1",
      links: [
        {
          url: null,
          label: "&laquo; Previous",
          active: false,
        },
        {
          url: "http://10.129.23.206:8080/api/events?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false,
        },
      ],
      next_page_url: null,
      path: "http://10.129.23.206:8080/api/events",
      per_page: 2,
      prev_page_url: null,
      to: null,
      total: 2,
    },
  },
};

const testResponseUpcomingEvents = {
  data: {
    message: "The events have been returned successfully",
    events: {
      current_page: 1,
      data: [
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
      ],
      first_page_url: "http://10.129.23.206:8080/api/events?page=1",
      from: null,
      last_page: 1,
      last_page_url: "http://10.129.23.206:8080/api/events?page=1",
      links: [
        {
          url: null,
          label: "&laquo; Previous",
          active: false,
        },
        {
          url: "http://10.129.23.206:8080/api/events?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false,
        },
      ],
      next_page_url: null,
      path: "http://10.129.23.206:8080/api/events",
      per_page: 2,
      prev_page_url: null,
      to: null,
      total: 2,
    },
  },
};

const testResponsePastEvents = {
  data: {
    message: "The events have been returned successfully",
    events: {
      current_page: 1,
      data: [
        {
          id: 2,
          slug: "canyon-social-ride-2",
          title: "Canyon Social Ride 2022",
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
      first_page_url: "http://10.129.23.206:8080/api/events?page=1",
      from: null,
      last_page: 1,
      last_page_url: "http://10.129.23.206:8080/api/events?page=1",
      links: [
        {
          url: null,
          label: "&laquo; Previous",
          active: false,
        },
        {
          url: "http://10.129.23.206:8080/api/events?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false,
        },
      ],
      next_page_url: null,
      path: "http://10.129.23.206:8080/api/events",
      per_page: 2,
      prev_page_url: null,
      to: null,
      total: 1,
    },
  },
};

const testResponseMyEvents = {
  data: {
    message: "My events have been returned successfully",
    events: {
      current_page: 1,
      data: [
        {
          id: 3,
          slug: "user-event-1",
          title: "User event",
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
      first_page_url: "http://10.129.23.206:8080/api/events?page=1",
      from: null,
      last_page: 1,
      last_page_url: "http://10.129.23.206:8080/api/events?page=1",
      links: [
        {
          url: null,
          label: "&laquo; Previous",
          active: false,
        },
        {
          url: "http://10.129.23.206:8080/api/events?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false,
        },
      ],
      next_page_url: null,
      path: "http://10.129.23.206:8080/api/events",
      per_page: 2,
      prev_page_url: null,
      to: null,
      total: 1,
    },
  },
};
