/* eslint-disable react/jsx-no-undef */
"use client";

import React, { useEffect, useState } from "react";
import AppButton from "../components/atoms/AppButton";
import AppTextArea from "../components/atoms/AppTextArea";
import AppInput from "../components/atoms/AppInput";
import AppToggle from "../components/atoms/AppToggle";
import AppSelect from "../components/molecules/AppSelect";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import HttpService from "@/services/http.service";
import {
  cityValidation,
  houseNumberValidation,
  postalCodeValidation,
  routeIdValidation,
  streetNameValidation,
} from "@/services/validation.service";
import { hasErrors } from "../../services/validation.service";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import Link from "next/link";

/**
 * Page is a component representing the Create an Event page in the application.
 *
 * @component
 * @returns {React.Element} A React element representing the Create an Event page.
 *
 * @example
 * // This component is used as follows:
 * <Page />
 */

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitGood, setSubmitGood] = useState(false);
  const [submitNotGood, setSubmitNotGood] = useState("");
  const [paid, setPaid] = useState(false);
  const [isValidRoute, setIsValidRoute] = useState(true);
  const [validLinks, setValidLinks] = useState([]);
  // It would be handy if these could come out of the DB
  const EVENT_TYPES = [
    { value: "WEBINAR", label: "Webinar" },
    { value: "CLUBEVENT", label: "Clubevent" },
    { value: "GENERAL", label: "General" },
    { value: "ROUTEBUDDY", label: "Routebuddy" },
  ];

  const onSubmit = async (data) => {
    if (hasErrors(errors)) {
      return setSubmitNotGood("Event could not be created");
    }
    setLoading(true);
    try {
      setSubmitNotGood("");
      const formData = new FormData();
      formData.append("title", data.name_event);
      formData.append("description", data.description);
      formData.append("start", data.start_date);
      formData.append("end", data.end_date);
      formData.append("price", data.price || 0);
      formData.append("max_participant", data.participants);
      formData.append("city", data.city);
      formData.append("zip", data.zip_code);
      formData.append("street", data.street);
      formData.append("house_number", data.house_number);
      formData.append("visible", "1");
      formData.append("event_image", data.banner_image[0]);
      formData.append("type", data.event_type);
      formData.append("badge_name", data.name_event);
      formData.append("badge_description", data.description);
      formData.append("badge_image", data.badge_icon[0]);
      validLinks.forEach((link) => {
        formData.append("routes[][id]", link);
      });

      const create_event = await HttpService.post("/events", formData, true);

      if (create_event.status === 201) {
        setSubmitGood(true);
        setTimeout(() => {
          router.push("/");
          return;
        }, 2000);
      }
    } catch (error) {
      setSubmitNotGood(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  const [routeInput, setRouteInput] = useState("");
  const handleRouteLinks = (e) => {
    setRouteInput(e);
    setIsValidRoute(true);
    const urlPattern =
      /^https:\/\/www\.routeyou\.com\/([a-z]{2}-[a-z]{2})\/route\/view\/(\d+)(\/.*)?$/;
    const match = e.match(urlPattern);
    if (!match) return setIsValidRoute(false);
    console.log(e.split("/")[6]);
    setRouteInput("");
    if (validLinks.includes(e.split("/")[6]))
      return alert("This route is already added.");
    setValidLinks([...validLinks, e.split("/")[6]]);
  };

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() - 1);

  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <form
      className="flex flex-col lg:flex-row-reverse gap-6 justify-between w-full lg:max-w-[256rem] lg:mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      method="post"
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-6 pt-6 max-w-3xl mx-auto w-full lg:max-w-none lg:w-1/2 lg:h-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-accent-blue text-base font-bold text-center">
              Event is being created ...
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-between gap-4 flex-wrap px-4">
              <h1>Create an event</h1>
              <AppButton
                bg_color={"bg-accent-blue"}
                innerText={"Go back"}
                handleClick={() => router.back()}
                type={"button"}
                className={"!border-none"}
              ></AppButton>
            </div>
            <div className="flex flex-col gap-6 px-10 py-6">
              <div className="flex flex-col gap-2 w-full">
                {submitGood ? (
                  <p className="text-accent-green font-bold">
                    Event created successfully
                  </p>
                ) : (
                  <></>
                )}
                {submitNotGood ? (
                  <p className="text-accent-red font-bold">{submitNotGood}</p>
                ) : (
                  <></>
                )}
                <AppInput
                  type={"text"}
                  autoComplete={"organization"}
                  validationSchema={{
                    maxLength: {
                      value: 45,
                      message: "This field is too long",
                    },
                    minLength: {
                      value: 3,
                      message: "This field is too short",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  label={"Name of the event"}
                  required={true}
                  handleChange={(e) => {
                    setValue("name_event", e.target.value);
                    setTitle(e.target.value);
                  }}
                  name={"name_event"}
                  register={register}
                  placeholder={"Name of the event"}
                  className="basis-1/2"
                  error={errors?.name_event}
                  errorText={errors?.name_event?.message}
                ></AppInput>
              </div>
              <AppTextArea
                errors={errors.description}
                validationSchema={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  minLength: {
                    value: 20,
                    message: "This field is too short",
                  },
                  maxLength: {
                    value: 1000,
                    message: "This field is too long",
                  },
                }}
                label={"Description"}
                required={true}
                handleChange={(e) => setValue("description", e.target.value)}
                name={"description"}
                register={register}
                minLength={10}
                maxLength={255}
                error={errors?.description}
                errorText={errors?.description?.message}
                placeholder={"Give a description of the event"}
              ></AppTextArea>
              <div className="flex gap-6 flex-col sm:flex-row">
                <AppInput
                  type={"datetime-local"}
                  autoComplete={"off"}
                  validationSchema={{
                    min: {
                      value: minimumDate.toISOString().split("T")[0],
                      message: "This field can't be in the past",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  label={"Start date"}
                  required={true}
                  handleChange={(e) => setValue("start_date", e.target.value)}
                  name={"start_date"}
                  register={register}
                  error={errors?.start_date}
                  errorText={errors?.start_date?.message}
                ></AppInput>
                <AppInput
                  type={"datetime-local"}
                  autoComplete={"off"}
                  validationSchema={{
                    min: {
                      value: minimumDate.toISOString().split("T")[0],
                      message: "This field can't be in the past",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  label={"End date"}
                  required={true}
                  handleChange={(e) => setValue("end_date", e.target.value)}
                  name={"end_date"}
                  register={register}
                  error={errors?.end_date}
                  errorText={errors?.end_date?.message}
                ></AppInput>
              </div>
              <AppToggle
                name="paid_event"
                register={() => {}}
                label="This is a paid event"
                checked={paid}
                onChange={() => setPaid(!paid)}
                value={paid}
                font_bold={false}
                className="w-fit"
              ></AppToggle>
              <div className="flex gap-6 flex-col lg:flex-row">
                {paid && (
                  <AppInput
                    type={"number"}
                    autoComplete={"off"}
                    validationSchema={{
                      min: {
                        value: 0,
                        message: "This field can't be negative",
                      },
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    label={"Price"}
                    required={true}
                    handleChange={(e) => setValue("price", e.target.value)}
                    name={"price"}
                    register={register}
                    placeholder={"0"}
                    error={errors?.price}
                    errorText={errors?.price?.message}
                  ></AppInput>
                )}
                <AppInput
                  type={"number"}
                  autoComplete={"off"}
                  validationSchema={{
                    min: {
                      value: 0,
                      message: "This field can't be negative",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  label={"Participants"}
                  required={true}
                  handleChange={(e) => setValue("participants", e.target.value)}
                  name={"participants"}
                  register={register}
                  placeholder={"0"}
                  error={errors?.participants}
                  errorText={errors?.participants?.message}
                ></AppInput>
              </div>
              <AppInput
                name="street"
                label="Street"
                type="text"
                placeholder="Street name"
                required={true}
                register={register}
                validationSchema={{
                  required: {
                    value: true,
                    message: "Street name is required",
                  },
                  validate: {
                    street: (value) =>
                      streetNameValidation(value) || "Invalid street name",
                  },
                  maxLength: {
                    value: 45,
                  },
                }}
                handleChange={(e) => setValue("street", e.target.value)}
                autocomplete="address-line-1"
                error={errors?.street}
                errorText={errors.street?.message}
              ></AppInput>
              <AppInput
                name="house_number"
                label="House Number"
                type="text"
                placeholder="1"
                required={true}
                register={register}
                validationSchema={{
                  required: {
                    value: true,
                    message: "House number is required",
                  },
                  validate: {
                    number: (value) =>
                      houseNumberValidation(value) || "Invalid house number",
                  },
                }}
                handleChange={(e) => setValue("house_number", e.target.value)}
                autocomplete="address-line-2"
                error={errors?.house_number}
                errorText={errors.house_number?.message}
              ></AppInput>
              <AppInput
                name={"city"}
                label={"City"}
                type={"text"}
                placeholder="City name"
                required={true}
                register={register}
                validationSchema={{
                  required: {
                    value: true,
                    message: "City name is required",
                  },
                  validate: {
                    city: (value) =>
                      cityValidation(value) || "Invalid city name",
                  },
                  maxLength: {
                    value: 45,
                  },
                }}
                handleChange={(e) => setValue("address", e.target.value)}
                autoComplete={"address-line-3"}
                error={errors?.city}
                errorText={errors.city?.message}
              ></AppInput>
              <AppInput
                name="zip_code"
                label="Zip code"
                type="text"
                placeholder="1234"
                required={true}
                register={register}
                validationSchema={{
                  required: { value: true, message: "Zip code is required" },
                  validate: {
                    zip: (value) =>
                      postalCodeValidation(value) || "Invalid zip code",
                  },
                }}
                handleChange={(e) => setValue("zip_code", e.target.value)}
                autocomplete="address-line-4"
                error={errors?.zip_code}
                errorText={errors.zip_code?.message}
              ></AppInput>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-6 flex-col lg:flex-row">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex relative">
                      <Link
                        href="https://www.routeyou.com/route/search/0/route-search"
                        className="absolute top-0 right-0 text-base font-medium text-accent-blue no-underline hover:underline lg:text-md"
                        target="_blank"
                      >
                        Copy the links from your favorite routes!
                      </Link>
                      <AppInput
                        type={"text"}
                        autoComplete={"off"}
                        validationSchema={() => {}}
                        label={"Route links"}
                        required={false}
                        handleChange={(e) => handleRouteLinks(e.target.value)}
                        name={"route_links"}
                        register={() => {}}
                        value={routeInput}
                        ariaInvalidOverride={!isValidRoute}
                        placeholder={
                          "https://www.routeyou.com/nl-be/route/view/1234567"
                        }
                      ></AppInput>
                    </div>
                    {!isValidRoute && (
                      <p className="text-accent-red">
                        This is not a valid RouteYou link.
                      </p>
                    )}
                    {
                      <ul className="p-4 flex flex-col gap-4">
                        {validLinks.map((link, i) => (
                          <li
                            className="font-medium text-md flex gap-4 items-center lg:text-base"
                            key={link}
                          >
                            <button
                              onClick={() => {
                                validLinks.splice(i, 1);
                              }}
                              className="hover:opacity-50 hover:scale-95 transition-all hover:transition-all"
                            >
                              <Icon
                                path={mdiTrashCanOutline}
                                color="#B30000"
                                className="w-12 lg:w-10"
                              ></Icon>
                            </button>
                            Route {i + 1}: {link}
                          </li>
                        ))}
                      </ul>
                    }
                  </div>
                </div>
                <AppInput
                  type={"file"}
                  autoComplete={"off"}
                  validationSchema={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    accept: {
                      value: ".png, .jpg, .jpeg",
                      message: "This field only accepts images",
                    },
                  }}
                  label={"Badge icon"}
                  required={true}
                  handleChange={() => {}}
                  name={"badge_icon"}
                  register={register}
                  acceptedFileTypes={".png, .jpg, .jpeg"}
                  error={errors?.badge_icon}
                  errorText={errors.badge_icon?.message}
                ></AppInput>
              </div>
              <AppInput
                type={"file"}
                autoComplete={"off"}
                validationSchema={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  accept: {
                    value: ".png, .jpg, .jpeg",
                    message: "This field only accepts images",
                  },
                }}
                label={"Select your banner image"}
                required={true}
                handleChange={() => {}}
                name={"banner_image"}
                register={register}
                acceptedFileTypes=".png, .jpg, .jpeg"
                error={errors?.banner_image}
                errorText={errors.banner_image?.message}
              ></AppInput>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="event_type"
                  className=" flex gap-1 font-medium text-base"
                >
                  Event type
                  <span className=" text-accent-red">*</span>
                </label>
                <select
                  name="event_type"
                  id="event_type"
                  autoComplete="off"
                  aria-invalid={!!errors.event_type}
                  value={watch("event_type")}
                  {...register("event_type", {
                    required: true,
                    validate: () => {
                      return (
                        EVENT_TYPES.some(
                          (event_type) =>
                            event_type.value === watch("event_type")
                        ) || "Please select a valid event type"
                      );
                    },
                  })}
                  className={`w-full p-4 text-base rounded-lg bg-background shadow-lg ${
                    errors.event_type && "border-2 border-accent-red"
                  }`}
                >
                  {EVENT_TYPES.map((event_type) => (
                    <option key={event_type.value} value={event_type.value}>
                      {event_type.label}
                    </option>
                  ))}
                </select>
                {errors.event_type && (
                  <p className="text-accent-red">{errors.event_type.message}</p>
                )}
              </div>
              <AppButton
                type="submit"
                bg_color="bg-primary-green"
                handleClick={() => {}}
                innerText="Create event"
                disabled={false}
                className="!border-none"
                name={"create_event"}
              ></AppButton>
            </div>
          </>
        )}
      </div>
      {!loading && (
        <div className="flex flex-col gap-0 h-full lg:w-1/2">
          {/* Custom map will come here */}
          {validLinks.length ? (
            <div className="relative w-full h-screen p-12 flex flex-col lg:p-0 lg:h-full">
              <div class="relative h-full flex flex-row">
                {validLinks.map((link, index) => {
                  return (
                    <iframe
                      title={`${index} ${title}`}
                      key={`iframe-${index}-${title}`}
                      id="iframe"
                      src={`https://plugin.routeyou.com/routeviewer/basic/?key=${
                        process.env.NEXT_PUBLIC_ROUTEYOU_API_KEY
                      }${`&params.route.id=${link}`}&language=en&detail.show.header=false&tabPane.position=null&map.api.key=${
                        process.env.NEXT_PUBLIC_ROUTEYOU_MAP_API_KEY
                      }&map.route.line.normal.standard.color=%2a2a2a&map.route.line.normal.standard.width=5&map.route.line.normal.standard.opacity=1&map.route.line.normal.standard.fill.color=%2a2a2a&map.route.line.normal.standard.fill.width=3&map.route.line.normal.standard.fill.opacity=0.7&map.route.line.normal.satellite.color=%2a2a2a&style.fill.color=%2a2a2a&style.fill.opacity=0.73&style.line.width=&style.line.color=%2a2a2a&map.type=terrain&map.show.instruction=true&map.show.positionData=true&`}
                      width="100%"
                      allow="geolocation"
                      className={`absolute transition duration-700 ease-in-out h-full ${
                        activeTab === index
                          ? "z-0 opacity-100"
                          : "opacity-0 -z-20"
                      }`}
                    ></iframe>
                  );
                })}
              </div>
              {validLinks.length > 1 && (
                <div className="flex flex-row flex-wrap gap-8 p-6">
                  <AppButton
                    innerText="Previous"
                    className="flex-1"
                    disabled={activeTab === 0}
                    handleClick={() => {
                      activeTab >= 1 ? setActiveTab(activeTab - 1) : "";
                    }}
                  ></AppButton>
                  <AppButton
                    innerText="Next"
                    className="flex-1"
                    disabled={activeTab === validLinks.length - 1}
                    handleClick={() => {
                      activeTab <= validLinks.length
                        ? setActiveTab(activeTab + 1)
                        : "";
                    }}
                  ></AppButton>
                </div>
              )}
            </div>
          ) : (
            <iframe
              title={`${title}`}
              key={`iframe-${title}`}
              id="iframe"
              src={`https://plugin.routeyou.com/routeviewer/basic/?key=${process.env.NEXT_PUBLIC_ROUTEYOU_API_KEY}&language=en&detail.show.header=false&map.zoom=2&tabPane.position=null&map.api.key=${process.env.NEXT_PUBLIC_ROUTEYOU_MAP_API_KEY}&map.route.line.normal.standard.color=%2a2a2a&map.route.line.normal.standard.width=5&map.route.line.normal.standard.opacity=1&map.route.line.normal.standard.fill.color=%2a2a2a&map.route.line.normal.standard.fill.width=3&map.route.line.normal.standard.fill.opacity=0.7&map.route.line.normal.satellite.color=%2a2a2a&style.fill.color=%2a2a2a&style.fill.opacity=0.73&style.line.width=&style.line.color=%2a2a2a&map.type=terrain&map.show.instruction=true&map.show.positionData=true&`}
              width="100%"
              allow="geolocation"
              className="h-full"
            ></iframe>
          )}
        </div>
      )}
    </form>
  );
}
