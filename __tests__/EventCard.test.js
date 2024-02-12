import React from "react";
import { render, screen } from "@testing-library/react";

import EventCard from "@/app/components/molecules/EventCard";

describe("EventCard Component", () => {
  it("small EventCard renders correctly for event with status finished", () => {
    const event = {
      id: 1,
      slug: "canyon-social-ride-1",
      title: "Canyon Social Ride",
      description: "Test Description",
      start: "2023-06-07 02:32:54",
      end: "2023-06-07 08:17:05",
      status: "FINISHED",
      street: "Dendermondsesteenweg",
      going_count: 0,
      zip: 9000,
      house_number: 25,
      city: "Gent",
      image: null,
    };

    render(<EventCard event={event} cardType={"small"} />);

    expect(screen.getByText("Canyon Social Ride")).toBeInTheDocument();
    expect(
      screen.getByText("Dendermondsesteenweg 25, 9000 Gent"),
    ).toBeInTheDocument();
    expect(screen.getByText("07/06/2023")).toBeInTheDocument();
    expect(screen.getByText("finished")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("small EventCard renders correctly for event with 120 participants", () => {
    const event = {
      id: 1,
      slug: "canyon-social-ride-1",
      title: "Canyon Social Ride",
      description: "Test Description",
      start: "2024-05-07 14:03:28",
      end: "2024-05-08 15:17:06",
      status: "UPCOMING",
      street: "Dendermondsesteenweg",
      going_count: 120,
      zip: 9000,
      house_number: 25,
      city: "Gent",
      image: null,
    };

    render(<EventCard event={event} cardType={"small"} />);

    expect(screen.getByText("Canyon Social Ride")).toBeInTheDocument();
    expect(
      screen.getByText("Dendermondsesteenweg 25, 9000 Gent"),
    ).toBeInTheDocument();
    expect(screen.getByText("07/05/2024")).toBeInTheDocument();
    expect(screen.getByText("upcoming")).toBeInTheDocument();
    expect(screen.getByText("+99")).toBeInTheDocument();
  });

  it("small EventCard renders correctly for event with status upcoming", () => {
    const event = {
      id: 1,
      slug: "canyon-social-ride-1",
      title: "Canyon Social Ride",
      description: "Test Description",
      start: "2024-05-07 14:03:28",
      end: "2024-05-08 15:17:06",
      status: "UPCOMING",
      street: "Dendermondsesteenweg",
      going_count: 0,
      participations: [],
      zip: 9000,
      house_number: 25,
      city: "Gent",
      image: null,
    };

    render(<EventCard event={event} cardType={"small"} />);

    expect(screen.getByText("Canyon Social Ride")).toBeInTheDocument();
    expect(
      screen.getByText("Dendermondsesteenweg 25, 9000 Gent"),
    ).toBeInTheDocument();
    expect(screen.getByText("07/05/2024")).toBeInTheDocument();
    expect(screen.getByText("upcoming")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("medium EventCard renders correctly for event with no going participants", () => {
    const event = {
      id: 1,
      slug: "canyon-social-ride-1",
      title: "Canyon Social Ride",
      description: "Test Description",
      start: "2023-06-07 02:32:54",
      end: "2023-06-07 08:17:05",
      status: "FINISHED",
      street: "Dendermondsesteenweg",
      zip: 9000,
      house_number: 25,
      city: "Gent",
      image: null,
      going_count: 0,
      participations: [],
    };

    render(<EventCard cardType="medium" event={event} />);

    expect(screen.getByText("Canyon Social Ride")).toBeInTheDocument();
    expect(
      screen.getByText("Dendermondsesteenweg 25, 9000 Gent"),
    ).toBeInTheDocument();
    expect(screen.getByText("07/06/2023")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("medium EventCard renders correctly for event with going participants", () => {
    const event = {
      id: 1,
      slug: "canyon-social-ride-1",
      title: "Canyon Social Ride",
      description: "Test Description",
      start: "2023-06-07 02:32:54",
      end: "2023-06-07 08:17:05",
      status: "FINISHED",
      street: "Dendermondsesteenweg",
      zip: 9000,
      house_number: 25,
      city: "Gent",
      image: null,
      going_count: 1,
      participations: [
        {
          id: 10,
          paid: 0,
          present: 1,
          reaction: "ABSENT",
          club_name: null,
          carpool: 1,
          carpool_role: "DRIVER",
          problem: null,
          user_id: 6,
          event_id: 1,
          badge_id: 7,
          user: {
            id: 6,
            first_name: "User",
            last_name: "Test",
            profile_picture: null,
          },
        },
        {
          id: 11,
          reaction: "GOING",
          user_id: 26,
          event_id: 1,
          badge_id: null,
          user: {
            id: 26,
            first_name: "User2",
            last_name: "Test2",
            profile_picture: null,
          },
        },
      ],
    };

    render(<EventCard cardType="medium" event={event} />);

    expect(screen.getByText("Canyon Social Ride")).toBeInTheDocument();
    expect(
      screen.getByText("Dendermondsesteenweg 25, 9000 Gent"),
    ).toBeInTheDocument();
    expect(screen.getByText("07/06/2023")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
