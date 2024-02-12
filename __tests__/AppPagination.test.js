import React from "react";
import { render, screen, within } from "@testing-library/react";
import AppPagination from "@/app/components/molecules/AppPagination";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation");

useSearchParams.mockReturnValue({
  get: () => {},
  entries: () => [],
});

describe("AppPagination Component", () => {
  it("Renders correctly", () => {
    render(<AppPagination data={testResponse} />);

    const paginationNav = screen.getByRole("navigation", {
      name: "pagination",
    });
    expect(paginationNav).toBeInTheDocument();
    const paginationLinks = within(paginationNav).getAllByRole("link");
    expect(paginationLinks.length).toBe(6);
  });
});

// TestResponse with 4 pages
const testResponse = {
  message: "The events have been returned successfully",
  events: {
    current_page: 1,
    data: [
      {
        id: 17,
        title: "Goyette-Schroeder",
        description:
          "Ex rem accusantium numquam ex aut nisi rem. Quasi quas ab quo autem voluptates. Quia consequuntur omnis et quisquam et et. Dolor quis debitis quia eos.",
        start: "2023-03-01 06:02:40",
        end: "2023-03-03 23:58:11",
        price: "79.00",
        max_participant: 8750,
        city: "Powlowskiview",
        zip: 9346,
        street: "966 Bradtke Parks",
        house_number: "352",
        payment: null,
        visible: 0,
        image:
          "http://10.129.23.206:8080/storage/565a1c94d73daa56b6516501d83e2a40.png",
        type: "GENERAL",
        organisation_id: 8,
        badge_id: 10,
        created_at: "2023-12-31T17:06:20.000000Z",
        updated_at: "2023-12-31T17:06:20.000000Z",
        slug: "goyette-schroeder-17",
        status: "FINISHED",
        going_count: 0,
        routes: [
          {
            id: 7,
            routeyou_route_id: 13172217,
            event_id: 17,
            checkpoints: [],
          },
        ],
        badge: {
          id: 10,
          name: "Branson Terry",
          description:
            "Dolorum fugit repudiandae alias alias modi sint. Voluptatibus illum optio laboriosam ducimus fugit ipsam voluptatem laborum.",
          image:
            "http://10.129.23.206:8080/storage/26a67e177db7a63ba4189f315b2dd511.png",
        },
        participations: [],
      },
      {
        id: 18,
        title: "Wisozk, Labadie and D'Amore",
        description:
          "At sunt omnis eius repellendus blanditiis quo expedita. Pariatur voluptatem eum quam quo molestias. Quia excepturi qui voluptate est et optio. Voluptatum earum illo tenetur qui totam vel sit.",
        start: "2023-09-17 02:00:33",
        end: "2023-09-17 08:53:13",
        price: "36.00",
        max_participant: 7882,
        city: "West Viviane",
        zip: 2124,
        street: "49729 Schuster Islands Suite 798",
        house_number: "234",
        payment: null,
        visible: 1,
        image:
          "http://10.129.23.206:8080/storage/eb026749392f524943cc4880d3fe6da4.png",
        type: "WEBINAR",
        organisation_id: 5,
        badge_id: 15,
        created_at: "2023-12-31T17:06:20.000000Z",
        updated_at: "2023-12-31T17:06:20.000000Z",
        slug: "wisozk-labadie-and-damore-18",
        status: "FINISHED",
        going_count: 0,
        routes: [],
        badge: {
          id: 15,
          name: "Albertha McCullough",
          description:
            "Assumenda cupiditate voluptatem laudantium id dolorem dolorum eum. Et voluptatem excepturi qui quam. Et ipsam officia autem explicabo. Omnis est consequatur cumque.",
          image:
            "http://10.129.23.206:8080/storage/529881ad264f384a2595462618518872.png",
        },
        participations: [],
      },
      {
        id: 13,
        title: "Powlowski-Orn",
        description:
          "Et molestiae incidunt dolorem et fuga magni. Officiis sit sint non aut qui. Ad aut veritatis laborum reprehenderit provident earum mollitia placeat.",
        start: "2023-10-18 22:33:28",
        end: "2023-10-19 14:53:17",
        price: "95.00",
        max_participant: 2912,
        city: "South Todmouth",
        zip: 7912,
        street: "8538 Jacinto Shore Apt. 822",
        house_number: "197",
        payment: null,
        visible: 1,
        image:
          "http://10.129.23.206:8080/storage/ef056cc845db2c401d5917a7b141e25f.png",
        type: "WEBINAR",
        organisation_id: 6,
        badge_id: 2,
        created_at: "2023-12-31T17:06:20.000000Z",
        updated_at: "2023-12-31T17:06:20.000000Z",
        slug: "powlowski-orn-13",
        status: "FINISHED",
        going_count: 0,
        routes: [],
        badge: {
          id: 2,
          name: "Prof. Buster Harris",
          description:
            "Optio ut iure consequatur sint tempora. Dolorem qui quae iusto ut omnis recusandae ea. Velit quaerat distinctio et quaerat et. Sit dolor doloribus unde inventore dignissimos esse veniam.",
          image:
            "http://10.129.23.206:8080/storage/29c40826ded0921e4baedec30adf6a6d.png",
        },
        participations: [],
      },
      {
        id: 7,
        title: "Botsford, Wolf and Block",
        description:
          "Perspiciatis ut magnam nihil blanditiis. Temporibus reprehenderit nihil velit id corporis culpa quaerat. Tempore explicabo aut dolores cum recusandae.",
        start: "2023-10-25 22:33:17",
        end: "2023-10-28 11:23:18",
        price: "20.00",
        max_participant: 6795,
        city: "New Octavia",
        zip: 6389,
        street: "415 Zulauf Rapids",
        house_number: "393",
        payment:
          "Omnis aut in sit tempore quaerat quis quaerat. Eos et itaque tempore quis est. Rem sequi et molestias magni. Fugit possimus ea minus unde qui.",
        visible: 1,
        image:
          "http://10.129.23.206:8080/storage/de9517962e10e854174633674e0101d6.png",
        type: "ROUTEBUDDY",
        organisation_id: 4,
        badge_id: 6,
        created_at: "2023-12-13T10:31:39.000000Z",
        updated_at: "2023-12-13T10:31:39.000000Z",
        slug: "botsford-wolf-and-block-7",
        status: "FINISHED",
        going_count: 0,
        routes: [
          {
            id: 4,
            routeyou_route_id: 6431032,
            event_id: 7,
            checkpoints: [
              {
                id: 1,
                longitude: "147.697601",
                latitude: "-45.570373",
                coin: 1,
                route_id: 4,
                achievements: [
                  {
                    id: 7,
                    completed: 1,
                    checkpoint_id: 1,
                    participation_id: 9,
                  },
                ],
              },
              {
                id: 6,
                longitude: "41.515542",
                latitude: "-25.927427",
                coin: 73,
                route_id: 4,
                achievements: [
                  {
                    id: 15,
                    completed: 0,
                    checkpoint_id: 6,
                    participation_id: 14,
                  },
                ],
              },
              {
                id: 12,
                longitude: "-47.034126",
                latitude: "-36.043286",
                coin: 33,
                route_id: 4,
                achievements: [],
              },
            ],
          },
        ],
        badge: {
          id: 6,
          name: "Cristina Wilkinson",
          description:
            "Laborum harum et ut dolor provident saepe aut. Pariatur libero quod nemo est.",
          image:
            "http://10.129.23.206:8080/storage/94424345a3d9a615354ec064e24749c3.png",
        },
        participations: [
          {
            id: 4,
            paid: 1,
            present: 1,
            reaction: "INTERESTED",
            club_name: null,
            carpool: 0,
            carpool_role: null,
            problem:
              "Sed magni ducimus qui quia quas quia quos placeat. Iure quod aliquid ullam. Vitae corporis aut quos aut. Incidunt reprehenderit deleniti nihil iste aut a.",
            user_id: 8,
            event_id: 7,
            badge_id: null,
          },
        ],
      },
      {
        id: 2,
        title: "Trantow, Kautzer and Davis",
        description:
          "Sed quas aut aut facilis consequatur quidem. Sint a est eum reprehenderit voluptates.",
        start: "2023-11-03 02:30:17",
        end: "2023-11-05 11:45:28",
        price: "4.00",
        max_participant: 2297,
        city: "North Maziechester",
        zip: 9818,
        street: "411 Rollin Roads",
        house_number: "341",
        payment:
          "Quidem quae sit incidunt odio. Aliquam ut laborum quo cupiditate. Ipsum provident enim enim nihil cum eos.",
        visible: 1,
        image:
          "http://10.129.23.206:8080/storage/330b916c6507d8d124b57eacc1400aaa.png",
        type: "ROUTEBUDDY",
        organisation_id: 1,
        badge_id: 6,
        created_at: "2023-12-13T10:31:39.000000Z",
        updated_at: "2023-12-13T10:31:39.000000Z",
        slug: "trantow-kautzer-and-davis-2",
        status: "FINISHED",
        going_count: 2,
        routes: [
          {
            id: 5,
            routeyou_route_id: 13695152,
            event_id: 2,
            checkpoints: [
              {
                id: 9,
                longitude: "150.504476",
                latitude: "63.145029",
                coin: 85,
                route_id: 5,
                achievements: [
                  {
                    id: 3,
                    completed: 0,
                    checkpoint_id: 9,
                    participation_id: 20,
                  },
                  {
                    id: 11,
                    completed: 0,
                    checkpoint_id: 9,
                    participation_id: 19,
                  },
                ],
              },
              {
                id: 15,
                longitude: "-113.310975",
                latitude: "30.600899",
                coin: 35,
                route_id: 5,
                achievements: [],
              },
            ],
          },
        ],
        badge: {
          id: 6,
          name: "Cristina Wilkinson",
          description:
            "Laborum harum et ut dolor provident saepe aut. Pariatur libero quod nemo est.",
          image:
            "http://10.129.23.206:8080/storage/94424345a3d9a615354ec064e24749c3.png",
        },
        participations: [
          {
            id: 6,
            paid: 0,
            present: 1,
            reaction: "GOING",
            club_name: "Steuber LLC",
            carpool: 0,
            carpool_role: null,
            problem:
              "Veritatis qui dolor est suscipit et. Dolores sit laboriosam aut aut cumque blanditiis mollitia sapiente. Molestiae quidem iste incidunt et autem enim.",
            user_id: 27,
            event_id: 2,
            badge_id: 6,
          },
          {
            id: 9,
            paid: 1,
            present: 1,
            reaction: "GOING",
            club_name: "Eichmann-Smith",
            carpool: 0,
            carpool_role: null,
            problem:
              "At eos et est voluptas cum dolorem nemo. Itaque quos ipsum ipsam possimus amet doloribus vel. Culpa ad ducimus distinctio quod sed explicabo culpa ducimus.",
            user_id: 21,
            event_id: 2,
            badge_id: null,
          },
          {
            id: 20,
            paid: 0,
            present: 0,
            reaction: "INTERESTED",
            club_name: null,
            carpool: 0,
            carpool_role: null,
            problem:
              "Earum quia illo accusamus magnam rem et officiis. Ut est dicta repellat id consequatur rerum ipsum. Expedita voluptatibus ut laborum rerum. Possimus et sint eligendi quis quo aut.",
            user_id: 2,
            event_id: 2,
            badge_id: 6,
          },
        ],
      },
      {
        id: 5,
        title: "Abshire, Lindgren and Bahringer",
        description:
          "Facilis non explicabo aliquid consequuntur qui corrupti molestias. Velit consequatur culpa exercitationem enim.",
        start: "2023-11-09 05:03:48",
        end: "2023-11-11 05:49:41",
        price: "28.00",
        max_participant: 7308,
        city: "Santiagohaven",
        zip: 7309,
        street: "7198 Torp Wells Apt. 437",
        house_number: "312",
        payment:
          "Sed aut eum voluptatem quisquam et. Nemo ipsum rerum rerum modi. Ut maxime voluptatum mollitia magni laboriosam. Vero inventore rerum qui vero.",
        visible: 0,
        image:
          "http://10.129.23.206:8080/storage/173de12cc39325eeaedbae786ef4e3bc.png",
        type: "ROUTEBUDDY",
        organisation_id: 5,
        badge_id: 1,
        created_at: "2023-12-13T10:31:39.000000Z",
        updated_at: "2023-12-13T10:31:39.000000Z",
        slug: "abshire-lindgren-and-bahringer-5",
        status: "FINISHED",
        going_count: 1,
        routes: [
          {
            id: 9,
            routeyou_route_id: 13415301,
            event_id: 5,
            checkpoints: [
              {
                id: 17,
                longitude: "99.875620",
                latitude: "27.892244",
                coin: 13,
                route_id: 9,
                achievements: [],
              },
            ],
          },
        ],
        badge: {
          id: 1,
          name: "Terrance Fisher",
          description:
            "Consequatur architecto hic consequatur aut omnis molestias. Incidunt nisi aut occaecati corporis doloribus mollitia sit. Animi nesciunt nulla dignissimos eaque voluptates quibusdam repellat.",
          image:
            "http://10.129.23.206:8080/storage/d104bca8623f4c5d154792c3b02fd305.png",
        },
        participations: [
          {
            id: 1,
            paid: 1,
            present: 1,
            reaction: "INTERESTED",
            club_name: "Okuneva-Swift",
            carpool: 1,
            carpool_role: "PASSENGER",
            problem:
              "Qui expedita fugit soluta incidunt et. Dolores dolores non corrupti quia laudantium. Quia odio non ut enim ea doloremque veniam. Sit perferendis et saepe libero sed quas quos.",
            user_id: 6,
            event_id: 5,
            badge_id: 1,
          },
          {
            id: 18,
            paid: 0,
            present: 1,
            reaction: "GOING",
            club_name: "Dach-Schroeder",
            carpool: 1,
            carpool_role: "PASSENGER",
            problem: null,
            user_id: 24,
            event_id: 5,
            badge_id: null,
          },
        ],
      },
    ],
    first_page_url: "http://10.129.23.206:8080/api/events?page=1",
    from: 1,
    last_page: 4,
    last_page_url: "http://10.129.23.206:8080/api/events?page=4",
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
        url: "http://10.129.23.206:8080/api/events?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://10.129.23.206:8080/api/events?page=3",
        label: "3",
        active: false,
      },
      {
        url: "http://10.129.23.206:8080/api/events?page=4",
        label: "4",
        active: false,
      },
      {
        url: "http://10.129.23.206:8080/api/events?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: "http://10.129.23.206:8080/api/events?page=2",
    path: "http://10.129.23.206:8080/api/events",
    per_page: 6,
    prev_page_url: null,
    to: 6,
    total: 20,
  },
};
