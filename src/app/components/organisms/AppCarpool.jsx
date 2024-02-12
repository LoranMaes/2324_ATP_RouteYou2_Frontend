"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
//icons
import Icon from "@mdi/react";
import { mdiCar3Plus, mdiCloseCircle } from "@mdi/js";

//import components
import UserAvatar from "../atoms/UserAvatar";

const AppCarpool = ({ event, carpool }) => {
  const openPopup = () => {
    const modal = document.getElementById("carpoolModal");
    modal.showModal();
  };
  const closeModal = () => {
    const modal = document.getElementById("carpoolModal");
    modal.close();
  };
  return (
    <>
      <Icon path={mdiCar3Plus} size={"2.4rem"} />
      <div data-testid="carpool" className="flex flex-col flex-1 gap-[0.8rem]">
        <div className="flex flex-1 justify-between">
          <p className="font-semibold">Carpool options</p>
          {carpool && (
            <button
              data-testid="popup-button"
              type="button"
              className="flex items-center gap-[0.4rem] text-sm underline"
              onClick={() => {
                openPopup();
              }}
            >
              See more
            </button>
          )}
        </div>
        {carpool === true ? (
          <div className="flex flex-col gap-[0.8rem]">
            <div className="flex -space-x-[0.8rem] overflow-hidden">
              {event && (
                <>
                  {event.participations
                    .filter(
                      (participation) =>
                        participation.reaction === "GOING" &&
                        participation.carpool_role === "DRIVER"
                    )
                    .map((participation, index) => (
                      <UserAvatar size="small" key={index} />
                    ))}
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm">No options to carpool yet</p>
        )}
      </div>
      <dialog
        id="carpoolModal"
        className="w-full min-h-[25rem] rounded-[2rem] lg:w-9/12 lg:max-w-[1080px] backdrop:backdrop-blur-md"
      >
        <button
          aria-label="close"
          type="button"
          onClick={() => {
            closeModal();
          }}
          className="absolute inset-x-[0.8rem] top-[0.8rem]"
        >
          <Icon path={mdiCloseCircle} size={2} color={"red"} />
        </button>
        <div className="w-full p-[2rem]">
          <h2 className="text-h2 text-center font-bold py-[0.8rem] my-[0.8rem]">
            Carpool contacts
          </h2>
          <div className="flex flex-col flex-1 w-full">
            <ul className="flex-1">
              <li className="flex flex-row bg-accent-green justify-between text-center px-[0.8rem] text-background">
                <p className="font-bold">Name</p>
                <p className="font-bold">Email</p>
                <p className="font-bold">Phone</p>
                <p className="font-bold">Driver</p>
              </li>
              {event && (
                <>
                  {event.participations
                    .filter(
                      (participation) =>
                        participation.reaction === "GOING" &&
                        participation.carpool_role === "DRIVER"
                    )
                    .map((participation, index) => (
                      <li
                        key={index}
                        className="flex flex-row justify-between p-[0.8rem]"
                      >
                        <p className="md:w-3/12 flex-wrap">
                          {participation?.user.full_name || "No name specified"}
                        </p>
                        <Link
                          className="md:w-4/12 flex-wrap"
                          href={`mailto:${participation?.user.email}`}
                        >
                          {participation?.user.email || "No email specified"}
                        </Link>
                        <Link
                          className="md:w-4/12"
                          href={`tel:${participation?.user.phone_number}`}
                        >
                          {participation?.user.phone_number ||
                            "No number specified"}
                        </Link>
                        {participation?.carpool_role === "DRIVER" && (
                          <p className="px-[0.8rem] py-1 bg-primary-green text-background rounded-lg min-w-1/12 flex justify-center items-center">
                            {"Yes"}
                          </p>
                        )}
                        {participation?.carpool_role === "PASSENGER" && (
                          <p className="px-[0.8rem] py-1 bg-accent-red text-background rounded-lg min-w-1/12">
                            {"No"}
                          </p>
                        )}
                      </li>
                    ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AppCarpool;
