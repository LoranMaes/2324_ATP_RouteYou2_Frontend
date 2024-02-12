"use client";

import Icon from "@mdi/react";
import {
  mdiAlertCircleOutline,
  mdiEyeOffOutline,
  mdiEyeOutline,
} from "@mdi/js";
import { useState } from "react";

/**
 * AppInput component.
 *
 * @component
 * @name AppInput
 * @description Provides an input component to be used in a react-hook-form.
 * @param {string} name - The name of the input field. Defaults to "InputName".
 * @param {string} label - The label for the input field. Defaults to "Input label".
 * @param {Function} register - The register function from react-hook-form.
 * @param {Object} errors - The errors object from react-hook-form.
 * @param {boolean} required - Indicates if the input field is required. Defaults to false.
 * @param {string} type - The type of the input field. Defaults to "text".
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {Object} validationSchema - The validation schema for the input field.
 * @param {Object} icon - The icon object for the input field.
 * @param {Function} iconFunction - The icon function for the input field.
 * @param {string} acceptedFileTypes - The accepted file types for file input.
 * @param {Function} handleChange - The change event handler for the input field.
 * @param {string} autoComplete - The autocomplete attribute for the input field.
 * @returns {JSX.Element} The rendered AppInput component.
 */
export default function AppInput({
  name = "InputName",
  label = "Input label",
  register,
  error,
  errorText,
  required = false,
  type = "text",
  placeholder,
  validationSchema,
  icon,
  iconFunction,
  acceptedFileTypes,
  handleChange,
  autoComplete,
  value,
  ariaInvalidOverride,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <label className=" flex gap-1 font-medium text-base" htmlFor={name}>
        {label}
        {required && <span className=" text-accent-red">*</span>}
      </label>
      <div
        className={`relative flex justify-between items-center shadow-md rounded-lg ${
          (error || ariaInvalidOverride) && "border-2 border-accent-red"
        }`}
      >
        {type === "file" && (
          <input
            className={`grow text-base font-normal focus:outline-none focus:border-accent-gray focus:ring-1 focus:ring-accent-gray rounded-lg leading-tight p-6 lg:py-[.8rem] lg:px-[2.rem] appearance-none min-w-full`}
            id={name}
            name={name}
            type={type}
            accept={acceptedFileTypes}
            {...register(name, validationSchema)}
            required={required}
            onChange={(e) => handleChange(e)}
            aria-invalid={!!error || ariaInvalidOverride}
            autoComplete={autoComplete}
          />
        )}
        {type !== "file" && (
          <input
            className={`grow text-base font-normal focus:outline-none focus:border-accent-gray focus:ring-1 focus:ring-accent-gray rounded-lg leading-tight p-6 lg:py-[.8rem] lg:px-[2.rem] appearance-none`}
            id={name}
            name={name}
            type={
              type && type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeholder}
            {...(type && type === "number" && { min: 1 })}
            {...(type && type === "number" && { max: 999999 })}
            {...(type &&
              type === "date" && {
                min: new Date().toISOString().split("T")[0],
              })}
            {...register(name, validationSchema)}
            required={required}
            onChange={(e) => handleChange(e)}
            aria-invalid={!!error || ariaInvalidOverride}
            autoComplete={autoComplete}
            value={value}
          />
        )}
        {type === "password" ? (
          <>
            <div
              className="sr-only"
              aria-live="polite"
              // id="is-password-visible-message"
            >
              {isPasswordVisible ? "Password is visible" : "Password is hidden"}
            </div>
            <button
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute self-center right-4"
              aria-label="Toggle password visibility"
              type="button"
            >
              {isPasswordVisible ? (
                <Icon
                  path={mdiEyeOutline}
                  className="text-accent-gray"
                  size={"2.4rem"}
                />
              ) : (
                <Icon
                  path={mdiEyeOffOutline}
                  className="text-accent-gray"
                  size={"2.4rem"}
                />
              )}
            </button>
          </>
        ) : (
          ""
        )}
        {icon && !iconFunction && (
          <Icon
            className={`${icon.iconColor} ml-3 mr-3`}
            path={icon.iconPath}
            size={icon.iconSize}
          />
        )}
      </div>
      <div
        aria-live="assertive"
        id={`error-message-${name}`}
        className="flex gap-[0.8rem]"
      >
        {error ? (
          <>
            <Icon
              color="#B30000"
              path={mdiAlertCircleOutline}
              size={"2.4rem"}
            ></Icon>
            <p className="flex text-accent-red gap-4 flex-row items-center">
              {errorText}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
