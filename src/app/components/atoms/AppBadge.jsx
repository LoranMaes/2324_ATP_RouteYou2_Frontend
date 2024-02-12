import React from "react";

/**
 * Renders a badge component with customizable text color, background color, and title.
 *
 * @component
 * @name AppBadge
 * @description Renders a badge component with customizable text color, background color, and title.
 * @param {string} textColor - The text color of the badge. Defaults to "text-background".
 * @param {string} bgColor - The background color of the badge. Defaults to "bg-primary-green".
 * @param {string} title - The title text to be displayed in the badge.
 * @returns {JSX.Element} The rendered AppBadge component.
 */
const AppBadge = ({ title = "AppBadge", textColor, bgColor }) => {
  return (
    <span
      className={`
      ${textColor ? `${textColor}` : "text-background"}
      ${bgColor ? `${bgColor}` : "bg-primary-green"} 
      w-fit h-fit px-[1.6rem] py-[0.4rem] rounded-full flex items-center
      `}
    >
      <p className="whitespace-nowrap text-sm font-semibold">{title}</p>
    </span>
  );
};

export default AppBadge;
