"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import AppInput from "@/app/components/atoms/AppInput";
import { set, useForm } from "react-hook-form";
import AppButton from "@/app/components/atoms/AppButton";
import {
  mdiAlertCircleOutline,
  mdiFacebook,
  mdiGoogle,
  mdiLoading,
  mdiLogin,
} from "@mdi/js";
import Link from "next/link";
import { login } from "@/services/auth.service";
import Icon from "@mdi/react";
import { useRouter } from "next/navigation";
import {
  emailValidation,
  passwordValidation,
} from "@/services/validation.service";
import AuthScreen from "../components/molecules/AuthScreen";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState({
    email: true,
    password: true,
  });
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    error && setError("");
    setLoading(true);
    const l = await login(data.Email, data.Password)
      .then((res) => {
        // Verstuur de gebruiker naar de homepage
        router.refresh();
        return router.push("/");
      })
      .catch((err) => {
        setError("Invalid credentials");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInput = (e, type) => {
    switch (type) {
      case "email":
        setFirstTime({ ...firstTime, email: false });
        emailValidation(e.target.value)
          ? setErrorMessage({ ...errorMessage, email: "" })
          : setErrorMessage({ ...errorMessage, email: "Email is not valid" });
        break;
      case "password":
        setFirstTime({ ...firstTime, password: false });
        passwordValidation(e.target.value)
          ? setErrorMessage({ ...errorMessage, password: "" })
          : setErrorMessage({
              ...errorMessage,
              password: "Password is not valid",
            });
        break;
      default:
        break;
    }
  };

  return (
    <AuthScreen>
      <div className="flex flex-col gap-14 py-6 px-10 bg-background rounded-[3.2rem] -translate-y-12 w-full lg:translate-y-0 lg:w-1/2 lg:px-32 lg:max-w-6xl lg:h-full lg:justify-center lg:-translate-x-20">
        <h1>Log in</h1>

        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <div className="flex flex-col gap-4">
            <AppInput
              name="Email"
              label="Email"
              type="text"
              placeholder="jan.janssens@gmail.com"
              required={true}
              register={register}
              validationSchema={{
                required: { value: true, message: "Email is required" },
              }}
              handleChange={(e) => handleInput(e, "email")}
              autoComplete={"email"}
              ariaInvalidOverride={!!errorMessage?.email}
            ></AppInput>
            <div aria-live="assertive" id="error-form-message-email">
              {errorMessage.email && !firstTime.email && (
                <p className="text-accent-red flex gap-4 items-center">
                  <Icon path={mdiAlertCircleOutline} size={"2.4rem"}></Icon>
                  {errorMessage.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AppInput
              name="Password"
              label="Password"
              register={register}
              type="password"
              placeholder="********"
              required={true}
              validationSchema={{
                required: { value: true, message: "Password is required" },
              }}
              handleChange={(e) => handleInput(e, "password")}
              autoComplete={"current-password"}
              ariaInvalidOverride={!!errorMessage?.password}
            ></AppInput>
            <div aria-live="assertive" id="error-form-message-password">
              {errorMessage.password && !firstTime.password && (
                <p className="text-accent-red flex gap-4 items-center">
                  <Icon path={mdiAlertCircleOutline} size={"2.4rem"}></Icon>
                  {errorMessage.password}
                </p>
              )}
            </div>
          </div>

          {/* This is placeholder and does not work */}
          {/* <div className="flex justify-between text-accent-gray flex-wrap gap-14">
            <label
              className="flex items-center gap-4 text-base grow basis-[calc(50%-3.5rem)]"
              htmlFor="remember_me"
            >
              <input
                type="checkbox"
                name="remember_me"
                id="remember_me"
              ></input>
              Remember me
            </label>

            <Link
              href="#"
              className="grow basis-[calc(50%-3.5rem)] w-fit text-right"
            >
              Forgot Password
            </Link>
          </div> */}

          <div aria-live="assertive" id="error-message-general">
            {error && (
              <p className="text-accent-red flex gap-4 items-center">
                <Icon path={mdiAlertCircleOutline} size={"2.4rem"}></Icon>
                {error}
              </p>
            )}
          </div>

          <AppButton
            innerText={loading ? "Loading..." : "Log in"}
            type="submit"
            bg_color="bg-primary-green"
            outline={false}
            hoverAnimationRight={loading ? false : true}
            iconRight={!loading ? mdiLogin : mdiLoading}
            title_left="Login icon"
            className={`gap-4 ${
              loading ? "translate-y-0 cursor-wait opacity-80 " : ""
            }`}
            disabled={errorMessage.email || errorMessage.password}
          ></AppButton>
        </form>

        <div className="flex flex-col gap-14 lg:flex-row lg:flex-wrap lg:gap-y-4 lg:justify-center">
          <AppButton
            outline={true}
            innerText="Log in with Google"
            iconLeft={mdiGoogle}
            hoverAnimationRight={true}
            title_left="Google icon"
            handleClick={() => alert("Google login clicked PLACEHOLDER!!!!")}
            className="basis-[calc(50%-3.5rem)] grow box-border gap-8"
          ></AppButton>
          <AppButton
            outline={true}
            innerText="Log in with Facebook"
            iconLeft={mdiFacebook}
            hoverAnimationRight={true}
            title_left="Facebook icon"
            handleClick={() => alert("Facebook login clicked PLACEHOLDER!!!!")}
            className="basis-[calc(50%-3.5rem)] grow box-border gap-8"
          ></AppButton>
        </div>

        <Link
          href="/register"
          className="text-center text-accent-gray pb-6 lg:pb-0"
        >
          No account yet? Sign up here
        </Link>
      </div>
    </AuthScreen>
  );
}
