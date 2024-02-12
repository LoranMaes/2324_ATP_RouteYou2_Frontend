"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import {
  mdiFilterOffOutline,
  mdiFilterOutline,
  mdiLoading,
  mdiMagnify,
} from "@mdi/js";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { DateTime } from "luxon";

import HttpService from "@/services/http.service";

import GoogleMaps from "@/app/components/organisms/GoogleMaps";
import AppInput from "@/app/components/atoms/AppInput";
import AppButton from "@/app/components/atoms/AppButton";
import AppToggle from "@/app/components/atoms/AppToggle";
import EventCard from "@/app/components/molecules/EventCard";
import AppPagination from "@/app/components/molecules/AppPagination";
import SkeletonEventCard from "@/app/components/atoms/SkeletonEventCard";

/**
 * Renders the search page component.
 *
 * @component
 * @description This function is used to render the search page component.
 * @returns {JSX.Element} The search page component.
 */
export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [initialDataError, setInitialDataError] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [query, setQuery] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      eventName: searchParams.get("title") || null,
      organisationName: searchParams.get("organisation_name") || null,
      eventStartDate: searchParams.get("start") || null,
      eventEndDate: searchParams.get("end") || null,
      maxParticipants: searchParams.get("max_participant") || null,
      isPaidEvent: searchParams.get("price") || false,
      eventPrice: searchParams.get("price")
        ? searchParams.get("price") === 9999
          ? 0
          : searchParams.get("price")
        : null,
    },
  });

  const now = DateTime.now();
  const futureDateTime = now.plus({ years: 100 }).toISODate();

  /**
   * Fetches events from the server.
   *
   * @description This function is used to fetch all events from the server.
   * @returns {Promise<void>}
   */
  const getEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await HttpService.get(`/events?&end=${futureDateTime}`);
      setAllEvents(response.data?.events);
    } catch (error) {
      setInitialDataError({ error });
    } finally {
      setLoading(false);
    }
  }, [futureDateTime]);

  /**
   * Fetches events based on the provided query. This function is used by the SWR hook.
   *
   * @description This function is used to fetch events from the server based on the provided query.
   * @param {string} query - The query string to be appended to the API endpoint.
   * @returns {Promise<Array>} - A promise that resolves to an array of events.
   * @throws {Error} - If an error occurs while fetching the data.
   */
  const fetcher = async (query) => {
    let response;
    if (searchParams.get("end")) {
      response = await HttpService.get(`/events${query}`);
    } else {
      response = await HttpService.get(`/events${query}&end=${futureDateTime}`);
    }
    if (response.status !== 200) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.data?.events;
  };

  const {
    data: searchResults,
    error: errorSWR,
    isLoading: loadingSWR,
    isValidating: validatingSWR,
  } = useSWR(query, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    const searchParamsArray = Array.from(searchParams.entries());
    if (searchParamsArray.length === 1) {
      if (!searchParamsArray[0][0] === "title") {
        setFiltersVisible(true);
      }
    } else if (searchParamsArray.length >= 2) setFiltersVisible(true);
    const current = new URLSearchParams(Array.from(searchParamsArray));
    const search = current.toString();
    const query = search ? `?${search}` : "";
    setQuery(query);
    setActiveMarker(null);
  }, [searchParams]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  /**
   * Handles the form submission for searching events. This function is used by the form hook. It will set the SWR query and push the query to the router.
   *
   * @description This function is used to handle the form submission for searching events.
   * @param {Object} data - The form data.
   * @returns {Promise<void>}
   */
  const onSubmit = async (data) => {
    const current = new URLSearchParams();
    // Check form data filters
    if (data.eventName) current.set("title", data.eventName);
    if (filtersVisible) {
      if (data.organisationName)
        current.set("organisation_name", data.organisationName);
      if (data.eventStartDate) current.set("start", data.eventStartDate);
      if (data.eventEndDate) current.set("end", data.eventEndDate);
      if (data.maxParticipants)
        current.set("max_participant", data.maxParticipants);
      if (data.isPaidEvent) {
        if (data.eventPrice) current.set("price", data.eventPrice);
        else current.set("price", 9999);
      }
    }
    // Set SWR query
    setQuery(`?${current.toString()}`);
    // Cast to string
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="flex flex-col w-full h-full box-border justify-center ">
      <div className="flex flex-col gap-[3.6rem] h-full w-full">
        <div className="flex w-full h-full">
          <section className="hidden w-full lg:flex h-[100vh] sticky top-0 bg-primary-green">
            {!loadingSWR && !validatingSWR && !loading ? (
              <>
                <h2 className="sr-only">Map</h2>
                <GoogleMaps
                  markerData={
                    searchResults && searchResults.total > 0
                      ? searchResults.data
                      : allEvents && allEvents.total > 0
                      ? allEvents.data
                      : null
                  }
                  activeMarker={activeMarker}
                />
              </>
            ) : null}
          </section>
          <section className="p-[3.2rem] w-full lg:max-w-[76rem] lg:-translate-x-20 lg:rounded-[5rem] bg-background">
            <h1 className="font-bold text-h1 my-[0.8rem]">
              Search for an event
            </h1>
            <section className="my-[0.8rem]">
              <h2 className="font-bold text-h2 my-[0.8rem]">Filters</h2>
              <div
                aria-live="assertive"
                aria-atomic="true"
                className="sr-only"
                id="general-announcement"
              >
                {filtersVisible ? (
                  <p>Filters visible</p>
                ) : (
                  <p>Filters hidden</p>
                )}
              </div>
              <form
                role="search"
                id="event-search"
                aria-label="Search for events"
                className="flex flex-col gap-[1.6rem] w-full"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <AppInput
                  name="eventName"
                  label="Name of the event"
                  type="search"
                  placeholder="Name of the event"
                  register={register}
                  handleChange={(e) => setValue("eventName", e.target.value)}
                />
                {filtersVisible ? (
                  <>
                    <AppInput
                      name="organisationName"
                      label="Organisation name"
                      type="text"
                      placeholder="Organisation name"
                      register={register}
                      handleChange={(e) =>
                        setValue("organisationName", e.target.value)
                      }
                    />
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-[1.6rem]">
                      <AppInput
                        name="eventStartDate"
                        label="Start date"
                        type="date"
                        register={register}
                        handleChange={(e) =>
                          setValue("eventStartDate", e.target.value)
                        }
                      />
                      <AppInput
                        name="eventEndDate"
                        label="End date"
                        type="date"
                        register={register}
                        handleChange={(e) =>
                          setValue("eventEndDate", e.target.value)
                        }
                      />
                    </div>
                    <AppInput
                      name="maxParticipants"
                      label="Max participants"
                      type="number"
                      placeholder="Max participants"
                      register={register}
                      handleChange={(e) =>
                        setValue("maxParticipants", e.target.value)
                      }
                    />
                    <AppToggle
                      name="isPaidEvent"
                      label="This is a paid event"
                      checked={watch("isPaidEvent") ? true : false}
                      register={register}
                      handleChange={(e) => {
                        setValue("isPaidEvent", e.target.value);
                      }}
                      value={watch("isPaidEvent") ? true : false}
                    />
                    {watch("isPaidEvent") ? (
                      <AppInput
                        name="eventPrice"
                        label="Max price"
                        type="number"
                        placeholder="Max price"
                        register={register}
                        handleChange={(e) =>
                          setValue("eventPrice", e.target.value)
                        }
                      />
                    ) : null}
                  </>
                ) : null}
                <AppButton
                  name="search"
                  innerText="Search"
                  type="submit"
                  bg_color="bg-primary-green"
                  outline={false}
                  hoverAnimationRight={
                    loadingSWR || validatingSWR || loading ? false : true
                  }
                  iconRight={
                    loadingSWR || validatingSWR || loading
                      ? mdiLoading
                      : mdiMagnify
                  }
                  title_left="Search icon"
                  className={`gap-4 ${
                    loadingSWR || validatingSWR || loading
                      ? "translate-y-0 cursor-wait opacity-80 "
                      : ""
                  }`}
                />
                <div className="flex gap-[0.8rem] w-full sm:justify-end">
                  {filtersVisible ? (
                    <AppButton
                      name="resetFilters"
                      innerText={"Reset filters"}
                      type="reset"
                      bg_color="bg-accent-red"
                      outline={true}
                      hoverAnimationRight={true}
                      iconRight={mdiFilterOffOutline}
                      title_left="Login icon"
                      className={`gap-4 w-full sm:w-fit !border-accent-red !text-accent-red ${
                        loadingSWR || validatingSWR || loading
                          ? "translate-y-0 cursor-wait opacity-80 "
                          : ""
                      }`}
                      handleClick={() => {
                        reset({
                          eventName: null,
                          organisationName: null,
                          eventStartDate: null,
                          eventEndDate: null,
                          maxParticipants: null,
                          isPaidEvent: false,
                          eventPrice: null,
                        });
                      }}
                    />
                  ) : null}
                  <AppButton
                    name="toggleFilters"
                    innerText={"Toggle filters"}
                    type="button"
                    bg_color="bg-primary-green"
                    outline={true}
                    hoverAnimationRight={true}
                    iconRight={mdiFilterOutline}
                    title_left="Login icon"
                    className={`gap-4 w-full sm:w-fit ${
                      loadingSWR || validatingSWR || loading
                        ? "translate-y-0 cursor-wait opacity-80 "
                        : ""
                    }`}
                    handleClick={() => {
                      setFiltersVisible(!filtersVisible);
                      const firstInput = document.querySelector(
                        "#event-search input"
                      );
                      firstInput.focus();
                    }}
                  />
                </div>
              </form>
            </section>
            <hr
              role="presentation"
              className="my-[1.6rem] h-[0.2rem] border-t-0 bg-accent-light-gray opacity-100 rounded"
            />
            <section className="my-[0.8rem] w-full">
              <h2 className="font-bold text-h2 my-[0.8rem]">Results</h2>

              <div
                aria-live="assertive"
                className="sr-only"
                aria-atomic="true"
                id="search-announcement"
              >
                {loadingSWR || validatingSWR || loading ? (
                  <p>Searching for events...</p>
                ) : errorSWR ? (
                  <p>An error occurred while fetching the data.</p>
                ) : searchResults && searchResults.total > 0 ? (
                  <p>
                    Showing {searchResults.total} results for your search.
                    Viewing page {searchResults.current_page} of{" "}
                    {searchResults.last_page}{" "}
                  </p>
                ) : !initialDataError &&
                  !searchResults &&
                  allEvents &&
                  allEvents.total > 0 ? (
                  <p>No search filters found. Showing all events instead.</p>
                ) : (
                  <p>No events found</p>
                )}
              </div>
              <div className="flex justify-center w-full relative">
                {loadingSWR || validatingSWR || loading ? (
                  <ul className="grid grid-cols-1 w-full place-items-center place-content-around gap-[1.6rem] xl:grid-cols-2 p-[1.6rem]">
                    <SkeletonEventCard number={6} cardType="small" />
                  </ul>
                ) : errorSWR ? (
                  <div className="flex items-center justify-center flex-grow w-full h-full">
                    <p>An error occurred while fetching the data.</p>
                    {errorSWR.status ? <p>Status: {errorSWR.status}</p> : null}
                    {errorSWR.info?.message ? (
                      <p>Message: {errorSWR.info.message}</p>
                    ) : null}
                  </div>
                ) : searchResults && searchResults.total > 0 ? (
                  <div className="flex flex-col w-full">
                    <ul className="grid grid-cols-1 w-full place-items-center place-content-around gap-[1.6rem] md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 p-[1.6rem]">
                      {searchResults.data.map((event, index) => (
                        <li key={event.slug}>
                          <EventCard
                            event={event}
                            cardType={"small"}
                            onMouseEnter={() => setActiveMarker(index)}
                          />
                        </li>
                      ))}
                    </ul>
                    <AppPagination
                      currentPage={searchResults.current_page}
                      lastPage={searchResults.last_page}
                    />
                  </div>
                ) : !searchResults && allEvents && allEvents.total > 0 ? (
                  <div className="flex flex-col w-full">
                    <ul
                      className="grid grid-cols-1 w-full place-items-center place-content-around gap-[1.6rem] md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 p-[1.6rem]"
                      onMouseLeave={() => {
                        setActiveMarker(null);
                      }}
                    >
                      {allEvents.data.map((event, index) => (
                        <li key={event.slug}>
                          <EventCard
                            event={event}
                            cardType={"small"}
                            onMouseEnter={() => {
                              setActiveMarker(index);
                            }}
                            onFocus={() => {
                              setActiveMarker(index);
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                    <AppPagination
                      currentPage={allEvents.current_page}
                      lastPage={allEvents.last_page}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-grow w-full h-full">
                    <p>No events found</p>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
