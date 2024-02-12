import React from "react";
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";

import GoogleMaps from "@/app/components/organisms/GoogleMaps";

const markerData = {
  data: [
    {
      id: 13,
      title: "Corwin Group",
      description:
        "Itaque repellendus quasi aliquam doloribus. Error doloremque rerum dicta quia.",
      start: "2023-01-12 16:39:23",
      end: "2023-01-13 16:21:28",
      price: "60.00",
      max_participant: 1965,
      city: "North Dakotaside",
      zip: 6624,
      street: "784 Keeley Mills Apt. 944",
      house_number: "393",
      visible: 0,
      image:
        "http://10.129.23.206:8080/storage/d648c8a116014d5c076a1685073c02c8.png",
      type: "GENERAL",
      latitude: "49.474434",
      longitude: "5.590102",
      organisation_id: 3,
      badge_id: 7,
      created_at: "2024-01-10T16:14:11.000000Z",
      updated_at: "2024-01-10T16:14:11.000000Z",
      slug: "corwin-group-13",
      status: "FINISHED",
      going_count: 0,
      routes: [],
      badge: {
        id: 7,
        name: "Dr. Trey Bergstrom",
        description:
          "Sed molestiae repellat ut. Et dolor dolores fugiat id qui itaque eum at. Qui et rerum in ea cum sit ducimus ratione.",
        image:
          "http://10.129.23.206:8080/storage/2665c9abd6f19dbe911e6601fc81a142.png",
      },
      participations: [],
    },
    {
      id: 10,
      title: "Upton, Howell and Leuschke",
      description:
        "Provident odit praesentium vel sint. Officia esse vero voluptas tempore. Qui quas iste sed. Veniam harum architecto molestiae autem laboriosam eveniet dicta.",
      start: "2023-01-16 02:08:32",
      end: "2023-01-18 16:36:46",
      price: "55.00",
      max_participant: 8015,
      city: "Port Alfonzoburgh",
      zip: 8216,
      street: "3775 Schamberger Gardens",
      house_number: "229",
      visible: 0,
      image:
        "http://10.129.23.206:8080/storage/dbd0df361afde1e0e0f05afb88d117b7.png",
      type: "ROUTEBUDDY",
      latitude: "49.587654",
      longitude: "2.564311",
      organisation_id: 1,
      badge_id: 4,
      created_at: "2024-01-10T16:14:11.000000Z",
      updated_at: "2024-01-10T16:14:11.000000Z",
      slug: "upton-howell-and-leuschke-10",
      status: "FINISHED",
      going_count: 0,
      routes: [],
      badge: {
        id: 4,
        name: "Karlee Collier",
        description:
          "A dolorum consectetur rerum et saepe. Incidunt voluptatibus iure illum enim sed consequuntur. Qui sit nesciunt rerum quia earum. Laboriosam iste omnis error nemo.",
        image:
          "http://10.129.23.206:8080/storage/ed89c7abf2ddfa0a1ac699dd6287358f.png",
      },
      participations: [],
    },
    {
      id: 73,
      title: "Schultz Inc",
      description:
        "Sed vero ullam sunt quis dignissimos aut. Hic doloribus et eum qui deleniti eveniet aspernatur. Delectus id libero voluptatem perferendis. Aut exercitationem et optio.",
      start: "2023-01-16 04:50:03",
      end: "2023-01-16 05:13:46",
      price: "64.00",
      max_participant: 2613,
      city: "Port Lauren",
      zip: 5732,
      street: "1727 Harvey Green Apt. 130",
      house_number: "34",
      visible: 0,
      image:
        "http://10.129.23.206:8080/storage/d7dbd03b488e238a28a9df3893893f7d.png",
      type: "ROUTEBUDDY",
      latitude: "50.688169",
      longitude: "4.667740",
      organisation_id: 1,
      badge_id: 8,
      created_at: "2024-01-10T16:14:12.000000Z",
      updated_at: "2024-01-10T16:14:12.000000Z",
      slug: "schultz-inc-73",
      status: "FINISHED",
      going_count: 0,
      routes: [],
      badge: {
        id: 8,
        name: "Dalton Wilkinson",
        description:
          "Nesciunt ut ipsa provident ut illo. Accusantium necessitatibus quidem dolores incidunt suscipit et. Distinctio et quos esse officia nobis. Hic labore tempora occaecati ut qui voluptas.",
        image:
          "http://10.129.23.206:8080/storage/d5c54da7a2500e1cdb98ae3298568ce2.png",
      },
      participations: [
        {
          id: 9,
          paid: 0,
          present: 0,
          reaction: "INTERESTED",
          club_name: "Gusikowski and Sons",
          carpool: 0,
          carpool_role: null,
          problem:
            "Aut ad architecto doloremque eaque autem impedit. Aut ipsam sint repudiandae delectus ea. Est nobis fugit at ab repudiandae quibusdam. Eum qui quia veritatis est quaerat eos.",
          user_id: 35,
          event_id: 73,
          badge_id: null,
        },
      ],
    },
    {
      id: 66,
      title: "Goodwin Ltd",
      description:
        "Ad odio debitis sint magnam dolor. Fuga inventore et atque amet. Aut nostrum quam quia aliquam cupiditate odio.",
      start: "2023-01-17 13:48:06",
      end: "2023-01-18 22:37:57",
      price: "62.00",
      max_participant: 5474,
      city: "Lake Laney",
      zip: 5294,
      street: "570 Lauretta Key",
      house_number: "236",
      visible: 1,
      image:
        "http://10.129.23.206:8080/storage/52c3b6ff6bc0f2c99bfda70db5a928d1.png",
      type: "ROUTEBUDDY",
      latitude: "49.788639",
      longitude: "3.215074",
      organisation_id: 5,
      badge_id: 8,
      created_at: "2024-01-10T16:14:12.000000Z",
      updated_at: "2024-01-10T16:14:12.000000Z",
      slug: "goodwin-ltd-66",
      status: "FINISHED",
      going_count: 1,
      routes: [],
      badge: {
        id: 8,
        name: "Dalton Wilkinson",
        description:
          "Nesciunt ut ipsa provident ut illo. Accusantium necessitatibus quidem dolores incidunt suscipit et. Distinctio et quos esse officia nobis. Hic labore tempora occaecati ut qui voluptas.",
        image:
          "http://10.129.23.206:8080/storage/d5c54da7a2500e1cdb98ae3298568ce2.png",
      },
      participations: [
        {
          id: 53,
          paid: 1,
          present: 0,
          reaction: "GOING",
          club_name: "Hoeger Ltd",
          carpool: 1,
          carpool_role: "PASSENGER",
          problem:
            "Nesciunt consectetur consequatur consequuntur placeat impedit consequatur doloremque. Quo veritatis voluptas dolorum id mollitia error consectetur natus. Optio aut architecto quisquam.",
          user_id: 67,
          event_id: 66,
          badge_id: null,
        },
      ],
    },
    {
      id: 91,
      title: "Cole PLC",
      description:
        "Ut minus perspiciatis suscipit libero. Et sed excepturi quos reprehenderit sequi. Velit non maiores dolore cum expedita ipsa.",
      start: "2023-01-20 04:27:07",
      end: "2023-01-21 20:16:06",
      price: "89.00",
      max_participant: 6524,
      city: "Port Micaela",
      zip: 8871,
      street: "77161 Carli Square",
      house_number: "87",
      visible: 1,
      image:
        "http://10.129.23.206:8080/storage/550dc3af9fbcd94d43be90b068b24bca.png",
      type: "WEBINAR",
      latitude: "49.148871",
      longitude: "2.062530",
      organisation_id: 2,
      badge_id: 8,
      created_at: "2024-01-10T16:14:12.000000Z",
      updated_at: "2024-01-10T16:14:12.000000Z",
      slug: "cole-plc-91",
      status: "FINISHED",
      going_count: 0,
      routes: [],
      badge: {
        id: 8,
        name: "Dalton Wilkinson",
        description:
          "Nesciunt ut ipsa provident ut illo. Accusantium necessitatibus quidem dolores incidunt suscipit et. Distinctio et quos esse officia nobis. Hic labore tempora occaecati ut qui voluptas.",
        image:
          "http://10.129.23.206:8080/storage/d5c54da7a2500e1cdb98ae3298568ce2.png",
      },
      participations: [],
    },
    {
      id: 83,
      title: "Kautzer, Mosciski and Bartell",
      description:
        "Iusto omnis recusandae sint ut ea voluptatem. Et qui magni in corporis numquam. Facilis expedita alias qui ut qui nemo deleniti. Iste assumenda dolores soluta assumenda ab.",
      start: "2023-01-20 09:27:27",
      end: "2023-01-23 06:09:40",
      price: "41.00",
      max_participant: 6196,
      city: "Gleichnermouth",
      zip: 8045,
      street: "471 Langworth Islands Suite 533",
      house_number: "42",
      visible: 1,
      image:
        "http://10.129.23.206:8080/storage/06332a84ebe3991b010d6735f0b921da.png",
      type: "GENERAL",
      latitude: "49.806148",
      longitude: "2.070678",
      organisation_id: 4,
      badge_id: 5,
      created_at: "2024-01-10T16:14:12.000000Z",
      updated_at: "2024-01-10T16:14:12.000000Z",
      slug: "kautzer-mosciski-and-bartell-83",
      status: "FINISHED",
      going_count: 0,
      routes: [],
      badge: {
        id: 5,
        name: "Ulises Kassulke",
        description:
          "Molestiae ut quia id rerum voluptatem. In consequuntur ipsam enim qui dolore est. Ullam nemo et at ut illo officia. Culpa in autem possimus fuga necessitatibus omnis.",
        image:
          "http://10.129.23.206:8080/storage/abb304408620885d136494ddd4f8ca74.png",
      },
      participations: [
        {
          id: 4,
          paid: 1,
          present: 1,
          reaction: "ABSENT",
          club_name: "Renner and Sons",
          carpool: 0,
          carpool_role: null,
          problem:
            "Et in iusto magni sapiente quia. Dicta et totam autem voluptates. A dolores repellat occaecati est nostrum ullam. Provident cum aut dolores natus.",
          user_id: 114,
          event_id: 83,
          badge_id: null,
        },
      ],
    },
  ],
};

describe("GoogleMaps Component", () => {
  it("renders correctly without Markers", async () => {
    await act(async () => {
      render(<GoogleMaps markerData={markerData.data} activeMarker={null} />);
    });
    const map = screen.getByTestId("map");
    expect(map).toBeInTheDocument();
  });

  // it("renders correctly with Markers", async () => {
  //   await act(async () => {
  //     render(<GoogleMaps markerData={markerData.data} activeMarker={null} />);
  //   });

  //   await waitForElementToBeRemoved(
  //     screen.getByText("Waiting for map to load"),
  //   );
  //   const map = screen.getByTestId("map");
  //   expect(map).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(
  //       screen.getByRole("region", {
  //         label: "Kaart",
  //       })
  //     ).toBeInTheDocument();
  //   });

  //   const markerEventOne = screen.getAllByRole("button");
  //   expect(markerEventOne).toBeInTheDocument();
  // });
});
