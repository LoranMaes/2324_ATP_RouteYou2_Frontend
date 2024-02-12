import React from "react";
import { render, screen, act } from "@testing-library/react";
import AppCarpool from "@/app/components/organisms/AppCarpool";
import { useRouter, usePathname } from "next/navigation";
import HttpService from "@/services/http.service";

jest.mock("next/navigation");
jest.mock("../src/services/http.service");
const pushMock = jest.fn();
afterEach(() => {
jest.clearAllMocks();
});
describe('AppCarpool component', () => { 
    it("renders correctly with users", async () => {
        useRouter.mockReturnValue({
            push: pushMock,
          });
          usePathname.mockReturnValue("/kovacek-llc-12");
          HttpService.get.mockResolvedValue({
            data: {
                "message": "The event has been returned successfully",
                "event": {
                  "id": 12,
                  "title": "Kovacek LLC",
                  "description": "Voluptate expedita libero nisi exercitationem consequuntur. Omnis corrupti sequi repudiandae ipsum. Nobis sit aut aspernatur ullam.",
                  "start": "2023-02-15 04:25:34",
                  "end": "2023-02-16 02:34:15",
                  "price": "22.00",
                  "max_participant": 1029,
                  "city": "Keltonstad",
                  "zip": 1902,
                  "street": "544 Gerhold Flats Apt. 039",
                  "house_number": "22",
                  "visible": 1,
                  "image": "https://storage.googleapis.com/staging-bucket-routeyou/61653664013373a04f9415e60241c9eb.png",
                  "type": "WEBINAR",
                  "latitude": "49.030202",
                  "longitude": "2.939555",
                  "organisation_id": 4,
                  "badge_id": 2,
                  "created_at": "2024-01-15T18:51:44.000000Z",
                  "updated_at": "2024-01-15T18:51:44.000000Z",
                  "slug": "kovacek-llc-12",
                  "status": "FINISHED",
                  "going_count": 2,
                  "routes": [],
                  "badge": {
                    "id": 2,
                    "name": "Ford Lockman",
                    "description": "Dolorem id architecto sint sint ut. Delectus nobis voluptatem id. Mollitia rerum non debitis.",
                    "image": "https://storage.googleapis.com/staging-bucket-routeyou/d6bda37993e3af7ccb38f7691e2dbafe.png"
                  },
                  "participations": [
                    {
                      "id": 9,
                      "paid": 0,
                      "present": 0,
                      "reaction": "GOING",
                      "club_name": "Hayes Group",
                      "carpool": 1,
                      "carpool_role": "DRIVER",
                      "problem": null,
                      "user_id": 10,
                      "event_id": 12,
                      "badge_id": null
                    },
                    {
                      "id": 97,
                      "paid": 0,
                      "present": 1,
                      "reaction": "GOING",
                      "club_name": null,
                      "carpool": 1,
                      "carpool_role": "DRIVER",
                      "problem": "Eveniet enim voluptatem neque ea nulla sit. Qui explicabo illum vitae consequuntur fuga est sed. Quisquam omnis aut saepe consequatur rerum libero ab. Et unde autem sed veritatis deserunt deleniti.",
                      "user_id": 30,
                      "event_id": 12,
                      "badge_id": null
                    }
                  ]
                }
            }
          });
        render(
            <AppCarpool event={event} carpool={true}/>
        );
        const carpool = screen.getByTestId('carpool');
        const popupButton = screen.getByTestId('popup-button');
        expect(popupButton).toBeVisible();
        expect(carpool).toBeInTheDocument();
        expect(popupButton).toHaveTextContent("See more");
        expect(carpool).toHaveTextContent("Carpool options");
    }),
    it("renders correctly without users", () => {
        render(
            <AppCarpool event={null} carpool={false}/>
        )
        const carpool = screen.getByTestId('carpool');
        expect(carpool).toHaveTextContent("Carpool options");
        expect(carpool).toHaveTextContent("No options to carpool yet");
    })
 })