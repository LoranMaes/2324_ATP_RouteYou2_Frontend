"use client";

import Icon from "@mdi/react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { useState } from "react";

/**
 * A custom textarea component.
 *
 * @component
 * @name AppTextArea
 * @description A custom textarea component to be used in a react-hook-form.
 * @param {string} name - The name of the textarea. Defaults to "TextAreaName".
 * @param {string} label - The label for the textarea. Defaults to "TextArea label".
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {Function} register - The register function from react-hook-form.
 * @param {Object} errors - The errors object from react-hook-form.
 * @param {boolean} required - Indicates if the textarea is required. Defaults to false.
 * @param {Object} validationSchema - The validation schema for the textarea.
 * @param {number} minLength - The minimum length of the textarea. Defaults to 0.
 * @param {number} maxLength - The maximum length of the textarea. Defaults to 255.
 * @returns {JSX.Element} The textarea component.
 */
export default function AppTextArea({
  name = "TextAreaName",
  label = "TextArea label",
  placeholder,
  register,
  error,
  errorText,
  required = false,
  validationSchema,
  minLength = 0,
  maxLength = 255,
  handleChange,
}) {
  const [characters, setCharacters] = useState(0);

  return (
    <div className="w-full flex flex-col gap-2">
      <label className=" flex gap-1 text-base" htmlFor={name}>
        {label}
        {required && <span className=" text-accent-red">*</span>}
      </label>
      <div
        className={`relative flex justify-between items-center shadow-md rounded-lg ${
          error && "border-2 border-accent-red"
        }`}
      >
        <textarea
          className={`grow text-base font-normal focus:outline-none focus:border-accent-gray focus:ring-1 focus:ring-accent-gray rounded-lg leading-tight px-4 py-3`}
          id={name}
          name={name}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(name, validationSchema)}
          required={required}
          onChange={(e) => {
            setCharacters(e.target.value.length);
            handleChange(e);
          }}
          aria-invalid={!!error}
        />
        <p className={`absolute bottom-0 right-4 text-sm`}>
          {characters} / {maxLength}
        </p>
      </div>
      <div
        className="sr-only"
        aria-live="polite"
        id={`description-character-count`}
      >
        {characters >= maxLength ? (
          <p>You have reached the maximum number of characters. </p>
        ) : null}
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
