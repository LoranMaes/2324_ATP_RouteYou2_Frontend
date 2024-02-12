import React from "react";
import { act, render, screen } from "@testing-library/react";
import DetailPage from "@/app/[slug]/page";
import { useRouter, usePathname, notFound } from "next/navigation";
import HttpService from "@/services/http.service";

jest.mock("next/navigation");
jest.mock("../src/services/http.service");
afterEach(() => {
  jest.clearAllMocks();
});

describe("Detail Page", () => {
  it("Should render correctly", async () => {
    const props = {
      params: {
        slug: "corwin-group-13",
      },
    };

    HttpService.get.mockResolvedValue({
      data: {
        message: "The event has been returned successfully",
        event: {
          id: 13,
          title: "Little, Hauck and Fay",
          description:
            "Consequatur quidem sapiente quaerat pariatur dolorem saepe fugiat sed. Rerum ut non ducimus occaecati expedita dolor. Beatae nesciunt qui tenetur.",
          start: "2023-12-05 17:24:10",
          end: "2023-12-06 22:12:28",
          price: "3.00",
          max_participant: 1604,
          city: "Gusikowskiborough",
          zip: 5365,
          street: "284 Rice Shore Suite 742",
          house_number: "319",
          visible: 0,
          image:
            "https://storage.googleapis.com/staging-bucket-routeyou/28eb3ca08e70c8ae317b1b6f7a411eec.png",
          type: "WEBINAR",
          latitude: "50.323871",
          longitude: "5.226839",
          organisation_id: 3,
          badge_id: 8,
          created_at: "2024-01-15T18:51:44.000000Z",
          updated_at: "2024-01-15T18:51:44.000000Z",
          slug: "little-hauck-and-fay-13",
          status: "FINISHED",
          going_count: 0,
          routes: [],
          badge: {
            id: 8,
            name: "Ernesto Herman",
            description:
              "Velit dolores a quia deleniti aut. Qui sint itaque quidem quibusdam et qui sed. Laudantium excepturi eveniet sit omnis et odit consequuntur autem. Possimus nihil dolore nostrum.",
            image:
              "https://storage.googleapis.com/staging-bucket-routeyou/49f32a2a775942e3c5627e31a8e18b47.png",
          },
          participations: [
            {
              id: 41,
              paid: 0,
              present: 0,
              reaction: "ABSENT",
              club_name: null,
              carpool: 1,
              carpool_role: "PASSENGER",
              problem:
                "Unde distinctio reiciendis odio dolorum eveniet. Cupiditate voluptatem ea accusantium voluptatibus dolor adipisci. Soluta reiciendis cumque dignissimos veritatis dignissimos suscipit omnis.",
              user_id: 10,
              event_id: 13,
              badge_id: null,
            },
          ],
        },
      },
    });

    const Result = await DetailPage(props);
    render(Result);

    const pageTitle = screen.getByText("Little, Hauck and Fay");
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.tagName).toBe("H1");

    const eventPrice = screen.getByText("€3.00");
    expect(eventPrice).toBeInTheDocument();
    expect(eventPrice.tagName).toBe("P");

    const eventLocation = screen.getByText(
      "Gusikowskiborough"
    );
    expect(eventLocation).toBeInTheDocument();
    expect(eventLocation.tagName).toBe("P");

    const eventDescription = screen.getByText(
      "Consequatur quidem sapiente quaerat pariatur dolorem saepe fugiat sed. Rerum ut non ducimus occaecati expedita dolor. Beatae nesciunt qui tenetur."
    );
    expect(eventDescription).toBeInTheDocument();
    expect(eventDescription.tagName).toBe("P");
  });

  // it("Should render correctly for incorrect event slug", async () => {
  //   const props = {
  //     params: {
  //       slug: "incorrectslug-999",
  //     },
  //   };
  //   jest.mock(notFound, () => jest.fn());

  //   HttpService.get.mockRejectedValue({
  //     status: 404,
  //     statusText: "Not Found",
  //     data: {
  //       message: "Event not found.",
  //     },
  //   });
  //   // A NEXT_NOT_FOUND error should be thrown
  //   const Result = await DetailPage(props);

  //   render(Result);
  //   expect(notFound).toHaveBeenCalled();
  //   expect(notFound).toThrow("NEXT_NOT_FOUND");
  // });
});
