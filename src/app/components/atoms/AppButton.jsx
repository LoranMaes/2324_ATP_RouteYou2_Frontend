"use client";

import React, { useState } from "react";
import Icon from "@mdi/react";

/**
 * AppButton is a customizable button component for React applications.
 *
 * @component
 * @param {Function} handleClick - The function to be executed when the button is clicked.
 * @param {mdiIcon} iconLeft - The icon to be displayed on the left side of the button.
 * @param {mdiIcon} iconRight - The icon to be displayed on the right side of the button.
 * @param {boolean} outline - If true, the button will have an outline style.
 * @param {string} title_left - The title for the left icon (for a11y reasons).
 * @param {string} title_right - The title for the right icon (for a11y reasons).
 * @param {number} gap - The gap between the button text and the icons.
 * @param {string} bg_color - The background color of the button.
 * @param {boolean} hoverAnimationLeft - If true, the left icon will have a hover animation.
 * @param {boolean} hoverAnimationRight - If true, the right icon will have a hover animation.
 * @param {string} innerText - The text to be displayed inside the button.
 * @param {string} type - The type of the button (e.g., "button", "submit").
 * @param {string} className - Additional CSS classes for the button.
 * @param {boolean} disabled - If true, the button will be disabled.
 * @param {string} name - The name attribute of the button.
 * @returns {React.Element} A React button element with custom properties.
 */

export default function AppButton({
  handleClick,
  iconLeft,
  iconRight,
  outline,
  title_left,
  title_right,
  gap,
  bg_color,
  hoverAnimationLeft,
  hoverAnimationRight,
  innerText,
  type,
  className,
  disabled,
  name,
}) {
  const icon_left = iconLeft ? iconLeft : false;
  const icon_right = iconRight ? iconRight : false;

  const handleBg = () => {
    switch (bg_color) {
      case "bg-primary-green":
        return "bg-primary-green";
      case "bg-accent-red":
        return "bg-accent-red";
      case "bg-primary":
        return "bg-primary";
      case "bg-accent-blue":
        return "bg-accent-blue";
      default:
        return "bg-primary-green";
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      name={name ? name : "no_name"}
      className={`flex justify-center ${
        gap ? `gap-${gap}` : ""
      } border-2 border-solid border-primary-green items-center ${
        bg_color
          ? outline
            ? "bg-opacity-0"
            : handleBg()
          : outline ?? "bg-primary-green"
      } lg:hover:opacity-80 ${
        outline ? "text-primary-green" : "text-background"
      } text-md lg:text-base rounded-xl px-6 py-2 lg:px-2.4rem lg:py-[.8rem] font-semibold transition-all duration-150 ${
        className ? className : ""
      } ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
      type={type ? type : "button"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || innerText === "Loading..."}
    >
      {iconLeft && (
        <Icon
          path={icon_left}
          title={title_left}
          id={title_left}
          className={`w-8 lg:w-10 transition-all duration-150 ${
            isHovered ? (hoverAnimationLeft ? "-translate-x-2" : "") : ""
          }`}
        />
      )}
      {innerText ? <span>{innerText}</span> : "No text given"}
      {iconRight && (
        <Icon
          path={icon_right}
          title={title_right}
          id={title_right}
          className={`w-8 lg:w-10 transition-all duration-150 ${
            innerText === "Loading..." ? "animate-spin" : ""
          } ${isHovered ? (hoverAnimationRight ? "translate-x-2" : "") : ""}`}
        ></Icon>
      )}
    </button>
  );
}
