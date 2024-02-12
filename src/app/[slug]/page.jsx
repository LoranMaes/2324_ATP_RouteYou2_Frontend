import getEvent from "@/lib/getEvent";
import getUser from "@/lib/getUser";
import getUserEvents from "@/lib/getUserEvents";
import Image from "next/image";
import Icon from "@mdi/react";
import {
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
  mdiCalendarRange,
  mdiCircleMedium,
  mdiCurrencyUsd,
  mdiCurrencyUsdOff,
  mdiMapMarker,
  mdiAccountOutline,
  mdiShare,
  mdiRoutes,
} from "@mdi/js";
import AppSelect from "@/app/components/molecules/AppSelect";
import AppParticipants from "@/app/components/organisms/AppParticipants";
import AppMollie from "@/app/components/molecules/AppMollie";
import AppCarpool from "@/app/components/organisms/AppCarpool";
import AppRegistration from "@/app/components/molecules/AppRegistration";
import AppCheckpoints from "@/app/components/molecules/AppCheckpoints";
import AppButtonRegistrate from "@/app/components/atoms/AppButtonRegistrate";
import ShareWrapper from "@/app/components/atoms/ShareWrapper";
import RouteMaps from "@/app/components/molecules/RouteMaps";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split("-").pop();
  try {
    const event = await getEvent(id);
    const userEvents = await getUserEvents();
    return {
      title: `${event.title}`,
      description: event.description,
      twitter: {
        card: "summary",
        title: `${event.title} | RouteYou`,
        description: event.description,
        siteId: "18190827",
        creator: "@routeyou",
        creatorId: "18190827",
        images: [event.image],
      },
      openGraph: {
        title: `${event.title} | RouteYou`,
        siteName: `${event.title} | RouteYou`,
        description: event.description,
        images: [{ url: event.image, alt: `Image for ${event.title} event` }],
        url: `/${event.slug}`,
        type: "website",
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const id = slug.split("-").pop();
  let event;
  let userEvents;
  try {
    event = await getEvent(id);
    userEvents = await getUserEvents();
  } catch (error) {
    notFound();
  }

  const user = await getUser();
  const options = [
    {
      label: "ABSENT",
    },
    {
      label: "INTERESTED",
    },
    {
      label: "GOING",
    },
  ];
  let startDateTime;
  let endDateTime;
  if (event.start) {
    const startDateDB = event.start.split(" ");
    const startDate = startDateDB[0];
    const startTime = startDateDB[1];
    startDateTime = `${startDate}T${startTime}.000000Z`;
  }
  if (event.end) {
    const endDateDB = event.end.split(" ");
    const endDate = endDateDB[0];
    const endTime = endDateDB[1];
    endDateTime = `${endDate}T${endTime}.000000Z`;
  }

  const carpoolDrivers = event.participations?.filter(
    (participation) =>
      participation.reaction === "GOING" &&
      participation.carpool_role === "DRIVER"
  );
  let validLinks = [];
  if (event.routes.length > 0) {
    event.routes.map((route) => {
      validLinks.push(route.routeyou_route_id);
    });
  }
  let organiser = false;
  let userOrganiser = false;
  if (user.ok) {
    if (user.data?.organisation_id) {
      userOrganiser = true;
    }
  }
  let userGoing = false;
  let userInterested = false;
  let userAbsent = false;
  let userPaid = false;
  if (userEvents.ok) {
    const checkGoing = event.participations.filter(
      (participation) =>
        participation.event_id === event.id &&
        participation.user_id === user.data.id &&
        participation.reaction === "GOING"
    );
    if (checkGoing.length) {
      userGoing = true;
    }
    const checkInterested = event.participations.filter(
      (participation) =>
        participation.event_id === event.id &&
        participation.user_id === user.data.id &&
        participation.reaction === "INTERESTED"
    );
    if (checkInterested.length) {
      userInterested = true;
    }
    const checkAbsent = event.participations.filter(
      (participation) =>
        participation.event_id === event.id &&
        participation.user_id === user.data.id &&
        participation.reaction === "ABSENT"
    );
    if (checkAbsent.length) {
      userAbsent = true;
    }
    const checkPaid = event.participations.filter(
      (participation) =>
        participation.event_id === event.id &&
        participation.user_id === user.data.id &&
        participation.paid === 1
    );
    if (checkPaid.length) {
      userPaid = true;
    }
    if (event.organisation_id === user.data.organisation_id) {
      organiser = true;
    }
  }
  let userStatus = true;
  let status = "ABSENT";
  if (userGoing) {
    status = "GOING";
    userStatus = false;
  } else if (userInterested) {
    status = "INTERESTED";
    userStatus = false;
  } else if (userAbsent) {
    status = "ABSENT";
    userStatus = false;
  }
  const checkpoints = [];
  event.routes?.map((route) => {
    if (route.checkpoints.length > 0) {
      route.checkpoints.map((checkpoint) => {
        checkpoints.push(checkpoint);
      });
    }
  });
  const routes = [];
  event.routes?.map((route) => {
    routes.push(route.id);
  });

  // @TODO: Update event organizer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: startDateTime,
    endDate: event.end
      ? endDateTime
      : DateTime.fromISO(event.start).plus({ hours: 4 }).toISO(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${event.street} ${event.house_number}, ${event.zip} ${event.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.street,
        addressLocality: event.city,
        postalCode: event.zip,
        addressCountry: "BE",
      },
    },
    image: [event.image],
    description: event.description,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_URL}/${event.slug}`,
      price: event.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: event.start,
    },
    organizer: {
      "@type": "Organization",
      name: "RouteYou",
      url: "https://routeyou.com",
      logo: "https://routeyou.com/favicon.ico",
    },
  };

  return (
    <section className="w-full flex flex-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="w-full h-[25rem] relative">
        <Image
          role="img"
          fill={true}
          priority
          quality={100}
          sizes="100vw"
          src={event.image}
          alt={`Image for ${event.title} event`}
          className="w-full h-full object-cover"
        />
      </section>
      <section className="w-full xl:w-7/12 p-[1.6rem] justify-evenly">
        <div className="flex flex-col gap-[0.8rem]">
          <div className=" md:flex flex-wrap items-center justify-between">
            <div className="flex gap-5 py-5 items-center">
              <div className="w-[5rem] h-[5rem] aspect-square relative">
                <Image
                  role="img"
                  src={event.badge.image}
                  width={50}
                  height={50}
                  alt={`Badge Image for ${event.badge.name} event`}
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
              </div>
              <h1 className="w-full font-bold text-h1">{event.title}</h1>
            </div>
            {user.ok && !userOrganiser ? (
              <AppSelect
                className={
                  "w-full h-[5rem] rounded-[0.8rem] text-[2rem] bg-primary-green text-background text-center"
                }
                options={options}
                post={userStatus}
                eventID={event.id}
                value={status}
                id={"interested"}
              />
            ) : null}
          </div>
          <ul className="flex flex-wrap text-accent-gray font-semibold items-center">
            <li className="flex items-center after:content-['\00b7'] after:mx-2">
              <p className="text-sm lg:text-base">{event.city}</p>
            </li>
            <li className="flex items-center after:content-['\00b7'] after:mx-2">
              {event.price > 0 ? (
                <p className="text-sm lg:text-base">€ {event.price}</p>
              ) : (
                <div className="flex gap-[0.4rem] items-center">
                  <Icon path={mdiCurrencyUsdOff} size={"1.6rem"} />
                  <p className="font-semibold">Free event</p>
                </div>
              )}
            </li>
            <li className="flex items-center after:content-['\00b7'] after:mx-2">
              <p className="text-sm lg:text-base">{event.start}</p>
            </li>
            {event.going_count > 0 ? (
              <>
                <li>
                  <p className="text-sm lg:text-base">
                    {event.going_count} participants
                  </p>
                </li>
              </>
            ) : (
              <>
                <li>
                  <p className="text-sm lg:text-base">No going participants</p>
                </li>
              </>
            )}
          </ul>
        </div>
        <h2 className="text-h2 font-bold pt-[0.8rem]">Description</h2>
        <p>{event.description}</p>
        {(user.ok && status !== 'ABSENT')|| organiser ? (
          <div className="py-10 w-full md:w-9/12">
            {organiser ? (
              <h2 className="text-h2 font-bold">You are the organiser</h2>
            ) : (
              <h2 className="text-h2 font-bold">This is your registration</h2>
            )}
            <div className="flex gap-[1rem] content-start py-5 w-full">
              <div className="font-bold">
                <p>Name:</p>
                <p>Mail:</p>
                <p>Address:</p>
              </div>
              <div>
                <p>{user.data?.full_name}</p>
                <p>{user.data?.email}</p>
                <p>
                  {user.data?.street} {user.data?.house_number}, {user.data?.zip}{" "}
                  {user.data?.city}
                </p>
              </div>
            </div>
            {event.price > 0 && !userPaid && userGoing && (
              <AppMollie eventID={event.id} value={status} />
            )}
            {userGoing && userPaid && 
              <AppButtonRegistrate eventID={event.id} value={status}/>
            }
            {userGoing && event.price == 0.00 &&
              <AppButtonRegistrate eventID={event.id} value={status}/>
            }
            {userGoing &&
              <AppRegistration 
                eventID={event.id}
                value = {status}
              />
            }
            {organiser &&
              <AppCheckpoints routes={routes}/>
            }
            {(userGoing && userPaid) || organiser ? 
            (
              <ul className="flex-1 flex-col">
                {checkpoints.map((checkpoint, index) => (
                  <li
                    key={index}
                    className="flex-1 flex flex-row w-full justify-between py-5"
                  >
                    <p className="font-bold">Checkpoint {index + 1}:</p>
                    <p>
                      {checkpoint.longitude}, {checkpoint.latitude}
                    </p>
                    {checkpoint.achievements.length ? (
                      <Icon
                        path={mdiCheckCircleOutline}
                        size={1.5}
                        className="text-accent-green"
                      />
                    ) : (
                      <Icon
                        path={mdiCloseCircleOutline}
                        className="text-accent-red"
                        size={1.5}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </section>
      <section className="w-full xl:w-5/12 pt-10 pr-10 pl-5 xl:pl-unset">
        <h2 className="text-h2 font-bold">Details</h2>
        <ul className="">
          <li className="flex px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            {event.price > 0 ? (
              <>
                <Icon path={mdiCurrencyUsd} size={"2.4rem"} />
                <div className="flex flex-col gap-[0.8rem]">
                  <p className="font-semibold">Paid event</p>
                  <div className="flex gap-[0.8rem] items-center">
                    <p className="text-sm">Price</p>
                    <Icon path={mdiCircleMedium} size={"0.8rem"} />
                    <p className="text-sm">{`€${event.price}`}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon path={mdiCurrencyUsdOff} size={"2.4rem"} />
                <p className="font-semibold">Free event</p>
              </>
            )}
          </li>
          <li className="flex flex-1 px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <Icon path={mdiCalendarRange} size={"2.4rem"} />
            <div className="flex flex-1 flex-col justify-between pr-[0.8rem]">
              <div>
                <p className="font-semibold">Start date</p>
                <div className="flex-1 flex flex-row">
                  <p className="text-sm after:content-['\00b7'] after:mx-2">
                    {event.start.split(" ")[0]}
                  </p>
                  <p className="text-sm">{event.start.split(" ")[1]}</p>
                </div>
              </div>
              {event.end ? (
                <div>
                  <p className="font-semibold">End date</p>
                  <div className="flex-1 flex flex-row">
                    <p className="text-sm after:content-['\00b7'] after:mx-2">
                      {event.end.split(" ")[0]}
                    </p>
                    <p className="text-sm">{event.end.split(" ")[1]}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </li>
          <li className="flex px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <Icon path={mdiMapMarker} size={"2.4rem"} />
            <div className="flex flex-col gap-[0.8rem]">
              <p className="font-semibold">Location</p>
              <p>
                {event.street} {event.house_number}, {event.zip} {event.city}
              </p>
            </div>
          </li>
          <li className="flex px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <AppParticipants event={event} />
          </li>
          <li className="flex px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <AppCarpool event={event} carpool={carpoolDrivers.length > 0} />
          </li>
          <li className="flex flex-col px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <div className="flex flex-row gap-[0.8rem]">
              <Icon path={mdiRoutes} size={"2.4rem"} />
              <p className="font-semibold">Routes</p>
            </div>
            {event.routes.length > 0 ? (
              <RouteMaps currentEvent={event} routes={validLinks} />
            ) : (
              <p className="pl-[3.2rem]">No routes available</p>
            )}
            {/* {validLinks && validLinks.length > 0 ? (
              <div className="flex flex-col gap-[0.8rem] w-full">
                {validLinks.map((link, index) => {
                  return (
                    <iframe
                      title={`${index} ${event.title}`}
                      key={`iframe-${index}-${event.title}`}
                      id="iframe"
                      src={`https://plugin.routeyou.com/routeviewer/basic/?key=${
                        process.env.NEXT_PUBLIC_ROUTEYOU_API_KEY
                      }${`&params.route.id=${link}`}&language=en&detail.show.header=false&tabPane.position=null&map.api.key=${
                        process.env.NEXT_PUBLIC_ROUTEYOU_MAP_API_KEY
                      }&map.route.line.normal.standard.color=%2a2a2a&map.route.line.normal.standard.width=5&map.route.line.normal.standard.opacity=1&map.route.line.normal.standard.fill.color=%2a2a2a&map.route.line.normal.standard.fill.width=3&map.route.line.normal.standard.fill.opacity=0.7&map.route.line.normal.satellite.color=%2a2a2a&style.fill.color=%2a2a2a&style.fill.opacity=0.73&style.line.width=&style.line.color=%2a2a2a&map.type=terrain&map.show.instruction=true&map.show.positionData=true&`}
                      width="100%"
                      allow="geolocation"
                      className={`w-[50rem] aspect-square`}
                    ></iframe>
                  );
                })}
              </div> */}
            {/* ) : (<p className="pl-[3.2rem]">No routes available</p>
            )} */}
          </li>

          <li className="flex px-[0.8rem] py-[0.4rem] gap-[0.8rem]">
            <Icon path={mdiShare} size={"2.4rem"} />
            <div className="flex flex-col gap-[0.8rem]">
              <p className="font-semibold">Share on</p>
              <ShareWrapper />
            </div>
          </li>
        </ul>
      </section>
      {organiser && event.participations.length ? (
        <section className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-h2 font-bold py-[1.6rem]">Participations</h2>
          <ul className="w-10/12 flex flex-col">
            <li className="flex flex-row flex-1 justify-between font-bold">
              <p className="md:w-3/12">Name</p>
              <p className="md:w-2/12">Has paid</p>
              <p className="md:w-3/12">Status</p>
              <p className="md:w-2/12 hidden md:flex">Checkpoints done</p>
              <p className="md:w-2/12 hidden md:flex">Completed</p>
            </li>
            {event.participations?.map((participation, index) => (
              <li
                key={index}
                className="flex flex-row flex-1 py-[0.8rem] justify-between"
              >
                <div className="flex flex-row items-center gap-[0.8rem] md:w-3/12">
                  <Icon
                    path={mdiAccountOutline}
                    size={2}
                    className="hidden md:block"
                  />
                  <div>
                    <p className="flex-wrap max-w-1/12 md:max-w-full">
                      {participation.user.full_name}
                    </p>
                    <p className="text-accent-gray hidden md:flex">
                      {participation.user.club_name || "No club name"}
                    </p>
                  </div>
                </div>

                <p className="md:w-2/12">{participation.paid ? "Yes" : "No"}</p>
                <p className="md:w-3/12">
                  {participation.present ? "Present" : "Not present"}
                </p>
                <div className="flex-row items-center gap-[0.8rem] md:w-2/12 hidden md:flex">
                  {checkpoints?.map((checkpoint, index) => {
                    let number = 0;
                    {
                      checkpoint.achievements.map((achievement) => {
                        if (achievement.participation_id === participation.id) {
                          number = index + 1;
                        }
                      });
                    }

                    if (index === checkpoints.length - 1 && number !== 0) {
                      return <p key={index}>{number}</p>;
                    }
                    if (number !== 0) {
                      return <p key={index}>{number},</p>;
                    } else {
                      return <p key={index}>-</p>;
                    }
                  })}
                </div>
                <div className="hidden md:flex flex-row items-center gap-[0.8rem] md:w-2/12 ">
                  {checkpoints?.map((checkpoint, index) => {
                    let number = 0;
                    {
                      checkpoint.achievements.map((achievement) => {
                        if (achievement.participation_id === participation.id) {
                          number = index + 1;
                        }
                      });
                    }

                    if (
                      index === checkpoints.length - 1 &&
                      number === index + 1
                    ) {
                      return (
                        <p
                          key={index}
                          className="px-[2rem] py-[0.2rem] rounded-lg bg-primary-green text-background"
                        >
                          Yes
                        </p>
                      );
                    } else if (index === checkpoints.length - 1) {
                      return (
                        <p
                          key={index}
                          className="px-[2rem] py-[0.2rem] rounded-lg bg-accent-red text-background"
                        >
                          No
                        </p>
                      );
                    }
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {organiser && !event.participations?.length ? (
        <section className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-h2 font-bold py-[1.6rem]">
            No participations yet
          </h2>
        </section>
      ) : null}
    </section>
  );
}
