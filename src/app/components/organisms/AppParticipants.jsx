"use client";
import React, { useState } from "react";
//icons
import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiCircleMedium, mdiCloseCircle } from "@mdi/js";
import Link from "next/link";
//import components
import UserAvatar from "../atoms/UserAvatar";

const AppParticipants = ({ event = {} }) => {
  const openPopup = () => {
    const modal = document.querySelector("dialog");
    modal.showModal();
  };
  const closeModal = () => {
    const modal = document.querySelector("dialog");
    modal.close();
  };
  return (
    <>
      <Icon path={mdiAccountMultiple} size={"2.4rem"} />
      <div
        data-testid="participants"
        className="flex flex-col flex-1 gap-[0.8rem]"
      >
        <div className="flex flex-1 justify-between">
          <p className="font-semibold">Participants</p>
          {event?.going_count ? (
            <button
              type="button"
              className="flex items-center gap-[0.4rem] text-sm underline"
              onClick={() => {
                openPopup();
              }}
            >
              See more
            </button>
          ) : ( null)}
        </div>

        {event?.going_count ? (
          <div className="flex flex-col gap-[0.8rem]">
            <div className="flex items-center gap-[0.4rem]">
              <p className="text-sm">Going</p>
              <Icon path={mdiCircleMedium} size={"0.8rem"} />
              <p className="text-sm">{event.going_count}</p>
            </div>
            <div className="flex -space-x-[0.8rem] overflow-hidden">
              {event && (
                <>
                  {event?.participations ? (
                    event.participations
                      .filter(
                        (participation) => participation.reaction === "GOING"
                      )
                      .map((participation, index) => (
                        <UserAvatar size="small" key={index} />
                      ))
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm">No going participants yet</p>
        )}
      </div>
      <dialog className="w-full min-h-[25rem] rounded-[2rem] lg:w-9/12 lg:max-w-[1080px] backdrop:backdrop-blur-md">
        <button
          aria-label="close"
          type="button"
          onClick={() => {
            closeModal();
          }}
          className="absolute inset-x-[0.8rem] top-[0.8rem]"
          data-testid="popupButton"
        >
          <Icon path={mdiCloseCircle} size={2} color={"red"} />
        </button>
        <div className="w-full p-[2rem]">
          <h2 className="text-h2 text-center font-bold py-[0.8rem] my-[0.8rem]">
            All participants
          </h2>

          <div className="flex flex-col flex-1 w-full">
            <ul className="flex flex-1 flex-row bg-accent-green justify-between px-[0.8rem] text-background">
              <li>
                <p className="font-bold">Name</p>
              </li>
              <li>
                <p className="font-bold">Email</p>
              </li>
              <li>
                <p className="font-bold">Phone</p>
              </li>
            </ul>
            {event && (
              <>
                {event?.participations &&
                  event.participations
                    .filter(
                      (participation) => participation.reaction === "GOING"
                    )
                    .map((participation, index) => (
                      <ul
                        key={index}
                        className="flex flex-1 flex-row justify-between px-[0.8rem] text-center"
                      >
                        <li>
                          <p>{participation?.user.full_name || "No name specified"}</p>
                        </li>
                        <li>
                          <Link href={`mailto:${participation?.user.email}`}>{participation?.user.email || "No email specified"}</Link>     
                        </li>
                        <li>
                          <Link href={`tel:${participation?.user.phone_number}`}>{participation?.user.phone_number || "No number specified"}</Link>
                        </li>
                      </ul>
                    ))}
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AppParticipants;
