import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@mdi/react";
import { DateTime } from "luxon";
import { mdiAccountMultiple, mdiContentCopy, mdiPencilOutline } from "@mdi/js";

import AppBadge from "../atoms/AppBadge";
import UserAvatar from "../atoms/UserAvatar";
import AppButton from "../atoms/AppButton";

/**
 * Renders an event card component.
 *
 * @component
 * @name EventCard
 * @description Renders an event card component.
 * @param {Object} props - The component props.
 * @param {Object} event - The event object.
 * @param {string} cardType - The type of card to render ("small" or "medium"). Defaults to "small".
 * @returns {JSX.Element} The rendered event card.
 */
const EventCard = ({
  event,
  cardType = "small",
  onMouseEnter,
  onMouseLeave,
  onFocus,
}) => {
  const eventStart = DateTime.fromSQL(event.start).toFormat("dd/MM/yyyy");
  const eventStatus = event.status.toLowerCase();
  const eventAddress = `${event.street} ${event.house_number}, ${event.zip} ${event.city}`;

  const handleCardClick = () => {
    const cardLink = document.getElementById(`card-link-${event.id}`);
    cardLink.click();
  };

  return (
    <>
      {cardType === "small" && (
        <div
          className="px-[0.8rem] py-[1.6rem] w-[32rem] h-[14rem] items-center shadow-xl rounded-[0.8rem] gap-[0.8rem] flex hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer focus-within:ring-2 focus-within:ring-accent-green motion-reduce:transition-none motion-reduce:hover:transform-none"
          onClick={handleCardClick}
          id={`card-${event.id}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
        >
          {event.image ? (
            <div className="w-[10rem] h-[10rem] aspect-square relative">
              <Image
                role="img"
                // fill={true}
                width={100}
                height={100}
                quality={100}
                priority={true}
                src={event.image}
                alt={`Image for ${event.title} event`}
                className="w-full h-full object-cover rounded-[0.8rem]"
              />
            </div>
          ) : (
            <div className="w-[10rem] h-[10rem] aspect-square relative">
              <Image
                role="img"
                fill={true}
                src="https://placehold.jp/30/d3d3d3/ffffff/100x100.png?text=event"
                alt={`Placeholder image for ${event.title} event`}
                className="w-full h-full object-cover rounded-[0.8rem]"
              />
            </div>
          )}
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <h3 className="text-base text-primary font-bold">
                <Link
                  href={`/${event.slug}`}
                  id={`card-link-${event.id}`}
                  className="no-underline hover:underline outline-none focus:ring-2 focus:ring-accent-green"
                >
                  {event.title.length > 20 ? (
                    <>{event.title.substring(0, 20)}...</>
                  ) : (
                    <>{event.title}</>
                  )}
                </Link>
              </h3>
              <p className="text-sm text-accent-green font-semibold capitalize">
                {eventStatus}
              </p>
              <p className="text-sm text-primary">
                {event.description.length > 25 ? (
                  <>{event.description.substring(0, 25)}...</>
                ) : (
                  <>{event.description}</>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-accent-gray">{eventAddress}</p>
              <div className="flex justify-between">
                <p className="text-sm text-accent-gray">{eventStart}</p>
                <div className="flex items-center gap-[0.8rem]">
                  <Icon
                    path={mdiAccountMultiple}
                    size={"1.6rem"}
                    className="text-accent-gray"
                  />
                  <p className="text-sm text-accent-gray">
                    {event.going_count > 99 ? "+99" : event.going_count}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {cardType === "medium" && (
        <div
          className="px-[0.8rem] py-[0.8rem] shadow-xl  min-w-[28rem] max-w-[28rem] h-[32rem] rounded-[0.8rem] flex flex-col gap-[0.8rem] no-underline z-10 flex-grow hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer focus-within:ring-2 focus-within:ring-accent-green motion-reduce:transition-none motion-reduce:hover:transform-none"
          onClick={handleCardClick}
          id={`card-${event.id}`}
        >
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex justify-between gap-[3.2rem]">
              <h3 className="text-base text-primary font-bold">
                <Link
                  href={`/${event.slug}`}
                  id={`card-link-${event.id}`}
                  className="no-underline hover:underline outline-none focus:ring-2 focus:ring-accent-green"
                >
                  {event.title}
                </Link>
              </h3>
              {/* {userIs === "organisator" ? (
              <AppBadge
                title="Organizer"
                bgColor="bg-accent-yellow"
                textColor="text-background"
              />
              ) : userIs === "participant" ? (
                <AppBadge
                  title="Participant"
                  bgColor="bg-primary-green"
                  textColor="text-background"
                />
              ) : null} */}
            </div>
            <p className="text-sm text-primary">
              {event.description.length > 30 ? (
                <>{event.description.substring(0, 30)}...</>
              ) : (
                <>{event.description}</>
              )}
            </p>
          </div>
          {event.image ? (
            <div className="w-[26.4rem] h-[12.5rem] relative">
              <Image
                src={event.image}
                // fill={true}
                width={264}
                height={125}
                quality={100}
                priority={true}
                // sizes={`(min-width: 768px) 100vw, 50vw`}
                alt={`Image for ${event.title} event`}
                className="w-full h-full object-cover rounded-[0.4rem]"
              />
            </div>
          ) : (
            <div className="w-[26.4rem] h-[12.5rem] relative">
              <Image
                src="https://placehold.jp/30/d3d3d3/ffffff/300x150.png?text=event"
                width={264}
                height={125}
                quality={100}
                priority={true}
                alt={`Image for ${event.title} event`}
                className="w-full h-full object-cover rounded-[0.4rem]"
              />
            </div>
          )}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between">
                <p className="text-sm text-accent-gray">{eventStart}</p>
                <div className="flex items-center gap-[0.8rem]">
                  <Icon
                    path={mdiAccountMultiple}
                    size={"1.6rem"}
                    className="text-accent-gray"
                  />
                  <p className="text-sm text-accent-gray">
                    {event.going_count > 99 ? "+99" : event.going_count}
                  </p>
                </div>
              </div>
              <p className="text-sm text-accent-gray">{eventAddress}</p>
            </div>
            {event.going_count > 0 && (
              <div className="flex -space-x-[0.8rem] overflow-hidden">
                {event && (
                  <>
                    {event.participations
                      .filter(
                        (participation) => participation.reaction === "GOING"
                      )
                      .map((participation, index) => (
                        <UserAvatar size="small" key={index} />
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
          {/* {userIs === "organisator" && ( */}
          {/* <div className="flex justify-between z-20 gap-[0.8rem]">
            <AppButton
              iconLeft={mdiContentCopy}
              title_left={"Copy event"}
              bg_color={"bg-primary-green"}
              innerText={"Copy event"}
              className={"!px-[0.8rem] !py-[0.6rem] border-none"}
              outline={false}
              hoverAnimationLeft={true}
              hoverAnimationRight={false}
              gap={"[0.8rem]"}
              type={"button"}
              handleClick={(e) => {
                e.preventDefault();
                console.log("Copy event");
              }}
              key={event.id}
            />
            <AppButton
              iconLeft={mdiPencilOutline}
              title_left={"Edit event"}
              className={"!px-[0.8rem] !py-[0.6rem] border-none"}
              innerText={"Edit event"}
              bg_color={"bg-accent-blue"}
              hoverAnimationLeft={true}
              hoverAnimationRight={false}
              gap={"[0.8rem]"}
              type={"button"}
              handleClick={() => console.log("Edit event")}
              outline={false}
            />
          </div> */}
          {/* )} */}
        </div>
      )}
    </>
  );
};

export default EventCard;
