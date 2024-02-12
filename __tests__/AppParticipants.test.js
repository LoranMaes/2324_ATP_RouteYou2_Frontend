import React from "react";
import { render, screen } from "@testing-library/react";
import AppParticipants from "../src/app/components/organisms/AppParticipants";

describe("AppParticipants component", () => {
  const event = {
    event: {
      id: 1,
      title: "Test event",
      description: "Test description",
      start: "2023-12-27 09:00:00",
      end: "2023-12-27 15:00:00",
      price: "50.00",
      max_participant: 100,
      city: "City",
      zip: 1703,
      street: "streetname",
      house_number: "37",
      visible: 1,
      image: "app_url/storage/JCRhhv7hD35ARVWgKQGpI4O0ZkpnYJWywJbsPoFN.png",
      type: "GENERAL",
      organisation_id: 1,
      badge_id: 1,
      created_at: "2023-12-06T14:53:31.000000Z",
      updated_at: "2023-12-06T14:53:31.000000Z",
      slug: "test-event-1",
      status: "UPCOMING",
      going_count: 0,
      routes: {
        id: 1,
        routeyou_route_id: 1234567,
        event_id: 1,
        checkpoints: {
          id: 1,
          longitude: "140.123685",
          latitude: "50.123650",
          coin: 10,
          qr_code:
            "app_url/storage/qr-codes/0b38d49e-e6db-4846-ae0f-b2a43c533afb.svg",
          route_id: 7,
          achievements: {
            id: 1,
            completed: false,
            checkpoint_id: 1,
            participation_id: 1,
          },
        },
      },
      badge: {
        id: 1,
        name: "Badge Name",
        description: "Badge Description",
        image: "app_url/storage/JCRhhv7hD35ARVWgKQGpI4O0ZkpnYJWywJbsPoFN.png",
      },
      participations: {
        id: 1,
        paid: false,
        present: false,
        reaction: "GOING",
        carpool: false,
        carpool_role: null,
        club_name: null,
        problem: null,
        user_id: 1,
        event_id: 1,
        badge_id: null,
      },
    },
  };
  it("renders correctly with users", () => {
    render(<AppParticipants event={event} />);
    const participants = screen.getByTestId("participants");
    const popupButton = screen.getByTestId("popupButton");
    expect(popupButton).not.toBeVisible();
    expect(participants).toBeInTheDocument();
    // expect(popupButton).toHaveTextContent("See more");
    // expect(participants).toHaveTextContent("Going");
    // expect(participants).toHaveTextContent("Participants");
  }),
    it("renders correctly without users", () => {
      render(<AppParticipants event={event} />);
      const participants = screen.getByTestId("participants");
      const popupButton = screen.getByTestId("popupButton");
      expect(popupButton).not.toBeVisible();
    //   expect(participants).toBeInTheDocument();
    //   expect(participants).toHaveTextContent("Participants");
    //   expect(participants).toHaveTextContent("No going participants yet");
    });
});
