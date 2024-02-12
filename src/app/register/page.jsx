"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthScreen from "../components/molecules/AuthScreen";
import AppInput from "../components/atoms/AppInput";
import Icon from "@mdi/react";
import AppButton from "../components/atoms/AppButton";
import AppTextArea from "../components/atoms/AppTextArea";
import AppToggle from "../components/atoms/AppToggle";
import { mdiAlertCircleOutline, mdiLoading, mdiLogin } from "@mdi/js";
import Link from "next/link";
import {
  cityValidation,
  emailValidation,
  houseNumberValidation,
  passwordValidation,
  phoneValidation,
  postalCodeValidation,
  streetNameValidation,
} from "@/services/validation.service";
import { registerUser } from "@/services/auth.service";
import { createOrganisation } from "../../services/auth.service";
import { hasErrors } from "../../services/validation.service";

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
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);

  const onSubmit = async (data) => {
    if (hasErrors(errors)) return setError("Please fill in all the fields");
    setLoading(true);
    try {
      const register = await registerUser(
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        data.phone_number,
        data.city,
        data.zip_code,
        data.street,
        data.house_number
      );
      if (toggle) {
        const create_org = await createOrganisation(
          data.organisation_name,
          data.organisation_description
        );
      }
      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen>
      <div className="flex flex-col gap-14 p-10 bg-background rounded-[3.2rem] -translate-y-12 w-full lg:translate-y-0 lg:w-1/2 lg:px-32 lg:max-w-6xl lg:min-h-full lg:h-fit lg:justify-center lg:-translate-x-20 ">
        <h1>Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          noValidate
          method="post"
        >
          <AppInput
            name="firstname"
            label="First name"
            type="text"
            placeholder="First name"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "First name is required" },
              minLength: { value: 2, message: "First name is too short" },
            }}
            handleChange={(e) => setValue("firstname", e.target.value)}
            autocomplete="given-name"
            error={errors?.firstname}
            errorText={errors?.firstname?.message}
          />
          <AppInput
            name="lastname"
            label="Last name"
            type="text"
            placeholder="Last name"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "Last name is required" },
              minLength: { value: 2, message: "Last name is too short" },
            }}
            handleChange={(e) => setValue("lastname", e.target.value)}
            autocomplete="family-name"
            error={errors?.lastname}
            errorText={errors?.lastname?.message}
          />
          <AppInput
            name="email"
            label="Email address"
            type="email"
            placeholder="Email address"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "Email is required" },
              validate: {
                email: (value) => emailValidation(value) || "Invalid email",
              },
            }}
            handleChange={(e) => setValue("email", e.target.value)}
            autocomplete="email"
            error={errors?.email}
            errorText={errors?.email?.message}
          />
          {/* TODO VLAGJE ERVOOR IN DE INPUTFIELD */}
          <AppInput
            name="phone_number"
            label="Phone number"
            type="tel"
            placeholder="+32 123 45 67 89"
            required={true}
            register={register}
            validationSchema={{
              required: {
                value: true,
                message: "Phone number is required",
              },
              // validate: {
              //   phone: (value) =>
              //     phoneValidation(value) || "Invalid phone number",
              // },
            }}
            handleChange={(e) => setValue("phone_number", e.target.value)}
            autocomplete="tel"
            error={errors?.phone_number}
            errorText={errors?.phone_number?.message}
          />
          <AppInput
            name="street"
            label="Street"
            type="text"
            placeholder="Street name"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "Street name is required" },
              validate: {
                street: (value) =>
                  streetNameValidation(value) || "Invalid street name",
              },
            }}
            handleChange={(e) => setValue("street", e.target.value)}
            autocomplete="address-line-1"
            error={errors?.street}
            errorText={errors?.street?.message}
          />
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
            errorText={errors?.house_number?.message}
          />
          <AppInput
            name="city"
            label="City"
            type="text"
            placeholder="City name"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "City name is required" },
              validate: {
                city: (value) => cityValidation(value) || "Invalid city name",
              },
            }}
            handleChange={(e) => setValue("city", e.target.value)}
            autocomplete="street-address-3"
            error={errors?.city}
            errorText={errors?.city?.message}
          />
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
            autocomplete="street-address-4"
            error={errors?.zip_code}
            errorText={errors?.zip_code?.message}
          />
          <AppInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required={true}
            register={register}
            validationSchema={{
              required: { value: true, message: "Password is required" },
              validate: {
                password: (value) =>
                  passwordValidation(value) ||
                  "Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character !@#$%^&*",
              },
            }}
            handleChange={(e) => setValue("password", e.target.value)}
            autocomplete="new-password"
            error={errors?.password}
            errorText={errors?.password?.message}
          />

          <AppInput
            name="repeat_password"
            label="Repeat Password"
            type="password"
            placeholder="Repeat Password"
            required={true}
            register={register}
            validationSchema={{
              required: {
                value: true,
                message: "Repeat password is required",
              },
              validate: {
                match: (value) =>
                  value === watch("password") || "Passwords don't match",
              },
            }}
            handleChange={(e) => setValue("repeat_password", e.target.value)}
            autocomplete="new-password"
            error={errors?.repeat_password}
            errorText={errors?.repeat_password?.message}
          />
          <div className="flex flex-col gap-4 p-4">
            <AppToggle
              name="toggle_event"
              register={() => {}}
              label="Create an organisation"
              checked={toggle}
              onChange={() => setToggle(!toggle)}
              value={toggle}
              font_bold={false}
            ></AppToggle>
            <p className="text-accent-red font-medium mb-4">
              This is required if you want to create events
            </p>

            {toggle && (
              <React.Fragment>
                <AppInput
                  name="organisation_name"
                  label="Organisation name"
                  type="text"
                  placeholder="Organisation name"
                  required={toggle ? true : false}
                  register={register}
                  validationSchema={{
                    required: {
                      value: toggle ? true : false,
                      message: "Organisation name is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Organisation name is too short",
                    },
                  }}
                  handleChange={(e) =>
                    setValue("organisation_name", e.target.value)
                  }
                  autocomplete="organization"
                  error={errors?.organisation_name}
                  errorText={errors?.organisation_name?.message}
                />
                <AppTextArea
                  name="organisation_description"
                  label="Organisation description"
                  placeholder="What does your organisation do?"
                  required={toggle ? true : false}
                  register={register}
                  validationSchema={{
                    required: {
                      value: toggle ? true : false,
                      message: "Organisation description is required",
                    },
                    minLength: {
                      value: 20,
                      message:
                        "Organisation description is too short. (min 20 characters)",
                    },
                    maxLength: {
                      value: 1000,
                      message:
                        "Organisation description is too long (max 1000 characters)",
                    },
                  }}
                  handleChange={(e) =>
                    setValue("organisation_description", e.target.value)
                  }
                  errors={errors.organisation_description}
                  minLength={20}
                  maxLength={1000}
                />
              </React.Fragment>
            )}
          </div>
          <div aria-live="assertive" id="error-message-form-general">
            {error && (
              <p className="flex text-accent-red gap-4 items-center">
                <Icon path={mdiAlertCircleOutline} size={"2.4rem"}></Icon>
                {error}
              </p>
            )}
          </div>
          <AppButton
            innerText={loading ? "Loading..." : "Create an account"}
            type="submit"
            bg_color="bg-primary-green"
            outline={false}
            className={`gap-4 ${
              loading ? "translate-y-0 cursor-wait opacity-80 " : ""
            }`}
            // disabled={watch(Object.entries(errors).map(([key, value]) => value))}
          />
        </form>

        <Link
          href="/login"
          className="text-center text-accent-gray pb-6 lg:pb-0"
        >
          Already have an account? Log in here
        </Link>
      </div>
    </AuthScreen>
  );
}
