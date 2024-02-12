"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";

import styles from "./page.module.css";

import HttpService from "@/services/http.service";
import EventCard from "@/app/components/molecules/EventCard";
import AppPagination from "@/app/components/molecules/AppPagination";
import SkeletonEventCard from "@/app/components/atoms/SkeletonEventCard";

/**
 * Represents the Home component.
 *
 * @component
 * @returns {JSX.Element} The Home component.
 */
export default function Home() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [allEvents, setAllEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [myEvents, setMyEvents] = useState(null);

  const now = DateTime.now();
  const nowDateTime = now.toISODate();
  const futureDateTime = now.plus({ years: 100 }).toISODate();

  /**
   * Fetches events from the server.
   *
   * @description This function is used to fetch events from the server.
   * @returns {Promise<void>} A promise that resolves when the events are fetched.
   */
  const getEvents = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page");
      const response = await HttpService.get(
        `/events?&end=${futureDateTime}${
          page ? `&page=${page}` : ""
        }&paginate=8`
      );
      setAllEvents(response.data?.events);
    } catch (error) {
      setDataError(error.message ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [searchParams, futureDateTime]);

  /**
   * Fetches upcoming events from the server.
   *
   * @description This function is used to fetch upcoming events from the server.
   * @returns {Promise<void>} A promise that resolves when the events are fetched.
   */
  const getUpcomingEvents = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page");
      const response = await HttpService.get(
        `/events?${page ? `&page=${page}` : ""}&paginate=8`
      );
      setUpcomingEvents(response.data?.events);
    } catch (error) {
      setDataError(error.message ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  /**
   * Fetches past events from the server.
   *
   * @description This function is used to fetch past events from the server.
   * @returns {Promise<void>} A promise that resolves when the past events are fetched.
   */
  const getPastEvents = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page");
      const response = await HttpService.get(
        `/events?end=${nowDateTime}${page ? `&page=${page}` : ""}&paginate=8`
      );
      setPastEvents(response.data?.events);
    } catch (error) {
      setDataError(error.message ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [searchParams, nowDateTime]);

  /**
   * Fetches user events from the server.
   *
   * @description This function is used to fetch user events from the server.
   * @returns {Promise<void>} A promise that resolves when the user events are fetched.
   */
  const getUserEvents = useCallback(async () => {
    setLoading(true);
    try {
      const page = searchParams.get("page");
      const response = await HttpService.get(
        `/user/events?${page ? `&page=${page}` : ""}paginate=8`
      );
      setMyEvents(response.data?.events);
    } catch (error) {
      setDataError(error.message ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  /**
   * Handles the click event on a tab.
   *
   * @description This function is used to handle the click event on a tab.
   * @param {Event} e - The click event.
   * @returns {Promise<void>}
   */
  const handleTabClick = useCallback(
    async (e) => {
      const tabId = e.currentTarget.id;
      const tabNumber = parseInt(tabId.split("-")[1]);
      switch (tabNumber) {
        case 1:
          await getEvents();
          break;
        case 2:
          await getUpcomingEvents();
          break;
        case 3:
          await getPastEvents();
          break;
        case 4:
          await getUserEvents();
          break;
        default:
          break;
      }
      setActiveTab(tabNumber - 1);
    },
    [getEvents, getUpcomingEvents, getPastEvents, getUserEvents, setActiveTab]
  );

  /**
   * Loads tab data based on the provided tab parameter.
   * If no tab is provided, it loads the default tab data.
   *
   * @description This function is used to load tab data based on the provided tab parameter.
   * @param {string} tab - The tab identifier.
   * @returns {Promise<void>} - A promise that resolves when the tab data is loaded.
   */
  const loadTabData = useCallback(
    async (tab = null) => {
      switch (tab) {
        case "upcoming-events":
          await handleTabClick({ currentTarget: { id: "tab-2" } });
          break;
        case "past-events":
          await handleTabClick({ currentTarget: { id: "tab-3" } });
          break;
        case "my-events":
          await handleTabClick({ currentTarget: { id: "tab-4" } });
          break;
        default:
          await handleTabClick({ currentTarget: { id: "tab-1" } });
          break;
      }
    },
    [handleTabClick]
  );

  useEffect(() => {
    let isSubscribed = true;
    const tab = searchParams.get("tab");
    loadTabData(tab);
    return () => (isSubscribed = false);
  }, [searchParams, loadTabData]);

  /**
   * Handles keyboard navigation for tabs.
   *
   * @description This function is used to navigate between tabs using the keyboard.
   * @param {Event} e - The keyboard event.
   * @returns {void}
   */
  const handleKeyBoardNavigation = (e) => {
    const tabs = document.querySelectorAll('[role="tab"]');
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        navigateToTab((activeTab - 1 + tabs.length) % tabs.length);
        break;
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        navigateToTab((activeTab + 1) % tabs.length);
        break;
      case "Home":
        e.preventDefault();
        navigateToTab(0);
        break;
      case "End":
        e.preventDefault();
        navigateToTab(3);
        break;
      default:
        break;
    }
  };

  /**
   * Navigates to the specified tab.
   *
   * @description This function is used to navigate to a tab programmatically.
   * @example navigateToTab(1) - Navigates to the first tab in the DOM element.
   * @param {number} tabNumber - The number of the tab to navigate to.
   * @returns {void}
   */
  const navigateToTab = (tabNumber) => {
    const tabs = document.querySelectorAll('[role="tab"]');
    setActiveTab(() => tabNumber);
    tabs[tabNumber].focus();
    tabs[tabNumber].click();
  };

  return (
    <div className="flex flex-col box-border m-[1.6rem] h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-[1.6rem]">
          <h1 id="tablist-1">Event Dashboard</h1>
          <ul
            role="tablist"
            aria-labelledby="tablist-1"
            className="flex flex-col md:flex-row items-start gap-[1.6rem] mb-[1.6rem]"
          >
            <li role="presentation">
              <Link
                id="tab-1"
                role="tab"
                href={"/"}
                scroll={false}
                tabIndex={activeTab === 0 ? 0 : -1}
                onClick={(e) => handleTabClick(e)}
                onKeyDown={(e) => handleKeyBoardNavigation(e)}
                aria-controls="all-events"
                aria-selected={activeTab === 0 ? "true" : "false"}
                className={`no-underline font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.2rem] after:bg-primary-green after:transition-all after:duration-300 after:ease-in-out after:transform after:translate-y-[0.4rem] after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 ${
                  activeTab === 0 ? "after:scale-x-100" : "after:scale-x-0"
                }`}
              >
                <h2>All Events</h2>
              </Link>
            </li>
            <li role="presentation">
              <Link
                id="tab-2"
                role="tab"
                href={"?tab=upcoming-events"}
                scroll={false}
                tabIndex={activeTab === 1 ? 0 : -1}
                onClick={(e) => handleTabClick(e)}
                onKeyDown={(e) => handleKeyBoardNavigation(e)}
                aria-controls="upcoming-events"
                aria-selected={activeTab === 1 ? "true" : "false"}
                className={`w-full h-full no-underline font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.2rem] after:bg-primary-green after:transition-all after:duration-300 after:ease-in-out after:transform after:translate-y-[0.4rem] after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 ${
                  activeTab === 1 ? "after:scale-x-100" : "after:scale-x-0"
                }`}
              >
                <h2>Upcoming Events</h2>
              </Link>
            </li>
            <li role="presentation">
              <Link
                id="tab-3"
                role="tab"
                href={"?tab=past-events"}
                scroll={false}
                tabIndex={activeTab === 2 ? 0 : -1}
                onClick={(e) => handleTabClick(e)}
                onKeyDown={(e) => handleKeyBoardNavigation(e)}
                aria-selected={activeTab === 2 ? "true" : "false"}
                aria-controls="past-events"
                className={`no-underline font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.2rem] after:bg-primary-green after:transition-all after:duration-300 after:ease-in-out after:transform after:translate-y-[0.4rem] after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 ${
                  activeTab === 2 ? "after:scale-x-100" : "after:scale-x-0"
                }`}
              >
                <h2>Past Events</h2>
              </Link>
            </li>
            <li role="presentation">
              <Link
                id="tab-4"
                role="tab"
                href={"?tab=my-events"}
                scroll={false}
                tabIndex={activeTab === 3 ? 0 : -1}
                onClick={(e) => handleTabClick(e)}
                onKeyDown={(e) => handleKeyBoardNavigation(e)}
                aria-selected={activeTab === 3 ? "true" : "false"}
                aria-controls="my-events"
                className={`no-underline font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.2rem] after:bg-primary-green after:transition-all after:duration-300 after:ease-in-out after:transform after:translate-y-[0.4rem] after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 ${
                  activeTab === 3 ? "after:scale-x-100" : "after:scale-x-0"
                }`}
              >
                <h2>My Events</h2>
              </Link>
            </li>
          </ul>
        </div>
        <div
          aria-live="assertive"
          className="sr-only"
          aria-atomic="true"
          id="tab-announcement"
        >
          {activeTab === 0 && !loading ? (
            allEvents && allEvents.total > 0 ? (
              <p>
                {allEvents.total} events found. Viewing page{" "}
                {allEvents.current_page} of {allEvents.last_page}
              </p>
            ) : (
              <p>No events found</p>
            )
          ) : null}
          {activeTab === 1 && !loading ? (
            upcomingEvents && upcomingEvents.total > 0 ? (
              <p>
                {upcomingEvents.total} events found. Viewing page{" "}
                {upcomingEvents.current_page} of {upcomingEvents.last_page}
              </p>
            ) : (
              <p>No events found</p>
            )
          ) : null}
          {activeTab === 2 && !loading ? (
            pastEvents && pastEvents.total > 0 ? (
              <p>
                {pastEvents.total} events found. Viewing page{" "}
                {pastEvents.current_page} of {pastEvents.last_page}
              </p>
            ) : (
              <p>No events found</p>
            )
          ) : null}
          {activeTab === 3 && !loading ? (
            myEvents && myEvents.total > 0 ? (
              <p>
                {myEvents.total} events found. Viewing page{" "}
                {myEvents.current_page} of {myEvents.last_page}
              </p>
            ) : (
              <p>No events found</p>
            )
          ) : null}
        </div>
        <hr
          role="presentation"
          className="h-[0.2rem] border-t-0 bg-accent-light-gray opacity-100 rounded"
        />
        <div
          id="all-events"
          role="tabpanel"
          aria-labelledby="tab-1"
          aria-hidden={activeTab === 0 ? "false" : "true"}
          className={`flex flex-col items-center justify-between w-full h-full relative mt-[1.6rem] gap-[1.6rem] ${
            activeTab === 0 ? "block" : "hidden"
          }`}
        >
          {activeTab === 0 ? (
            <>
              {loading ? (
                <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                  <SkeletonEventCard number={8} cardType="medium" />
                </ul>
              ) : !dataError ? (
                <>
                  {allEvents && allEvents.total > 0 ? (
                    <>
                      <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                        {allEvents.data.map((event) => (
                          <li key={event.slug}>
                            <EventCard event={event} cardType={"medium"} />
                          </li>
                        ))}
                      </ul>
                      <AppPagination
                        currentPage={allEvents.current_page}
                        lastPage={allEvents.last_page}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center flex-grow w-full h-full">
                      <p>No events found</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center flex-grow w-full h-full">
                  <p>{dataError}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
        <div
          id="upcoming-events"
          role="tabpanel"
          aria-labelledby="tab-2"
          aria-hidden={activeTab === 1 ? "false" : "true"}
          className={`flex flex-col items-center justify-between w-full h-full relative mt-[1.6rem] gap-[1.6rem] ${
            activeTab === 1 ? "block" : "hidden"
          }`}
        >
          {activeTab === 1 ? (
            <>
              {loading ? (
                <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                  <SkeletonEventCard number={8} cardType="medium" />
                </ul>
              ) : !dataError ? (
                <>
                  {upcomingEvents && upcomingEvents.total > 0 ? (
                    <>
                      <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                        {upcomingEvents.data.map((event) => (
                          <li key={event.slug}>
                            <EventCard event={event} cardType={"medium"} />
                          </li>
                        ))}
                      </ul>
                      <AppPagination
                        currentPage={upcomingEvents.current_page}
                        lastPage={upcomingEvents.last_page}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center flex-grow w-full h-full">
                      <p>No events found</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center flex-grow w-full h-full">
                  <p>{dataError}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
        <div
          id="past-events"
          role="tabpanel"
          aria-labelledby="tab-3"
          aria-hidden={activeTab === 2 ? "false" : "true"}
          className={`flex flex-col justify-between items-center w-full h-full relative mt-[1.6rem] gap-[1.6rem] ${
            activeTab === 2 ? "block" : "hidden"
          }`}
        >
          {activeTab === 2 ? (
            <>
              {loading ? (
                <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                  <SkeletonEventCard number={8} cardType="medium" />
                </ul>
              ) : !dataError ? (
                <>
                  {pastEvents && pastEvents.total > 0 ? (
                    <>
                      <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit gap-y-[1.6rem] gap-x-[3.6rem]">
                        {pastEvents.data.map((event) => (
                          <li key={event.slug}>
                            <EventCard event={event} cardType={"medium"} />
                          </li>
                        ))}
                      </ul>
                      <AppPagination
                        currentPage={pastEvents.current_page}
                        lastPage={pastEvents.last_page}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center flex-grow w-full h-full">
                      <p>No events found</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center flex-grow w-full h-full">
                  <p>{dataError}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
        <div
          id="my-events"
          role="tabpanel"
          aria-labelledby="tab-4"
          aria-hidden={activeTab === 3 ? "false" : "true"}
          className={`flex flex-col items-center justify-between w-full h-full relative mt-[1.6rem] gap-[1.6rem] ${
            activeTab === 3 ? "block" : "hidden"
          }`}
        >
          {activeTab === 3 ? (
            <>
              {loading ? (
                <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                  <SkeletonEventCard number={8} cardType="medium" />
                </ul>
              ) : !dataError ? (
                <>
                  {myEvents && myEvents.total > 0 ? (
                    <>
                      <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[1.6rem] gap-x-[3.6rem]">
                        {myEvents.data.map((event) => (
                          <li key={event.slug}>
                            <EventCard event={event} cardType={"medium"} />
                          </li>
                        ))}
                      </ul>
                      <AppPagination
                        currentPage={myEvents.current_page}
                        lastPage={myEvents.last_page}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center flex-grow w-full h-full">
                      <p>No events found</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center flex-grow w-full h-full">
                  <p>{dataError}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
