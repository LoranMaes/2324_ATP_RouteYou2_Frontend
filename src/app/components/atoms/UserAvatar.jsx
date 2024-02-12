import React from "react";
import Image from "next/image";

/**
 * UserAvatar component displays an avatar image for a user.
 *
 * @component
 * @name UserAvatar
 * @description Displays an avatar image for a user.
 * @param {number} size - The size of the avatar. Defaults to 40.
 * @param {string} userName - The username of the user.
 * @param {string} imageUrl - The URL of the avatar image.
 * @returns {JSX.Element} The UserAvatar component.
 */
const UserAvatar = ({ size = 40, userName, imageUrl }) => {
  return (
    <div
      className={`relative ${
        size === "small" ? "h-[2.4rem] w-[2.4rem]" : "h-[5.6rem] w-[5.6rem]"
      }`}
    >
      {!imageUrl ? (
        <Image
          src={require("@/app/assets/images/default-avatar.png")}
          alt={`Default Avatar for ${userName}`}
          className="rounded-full object-cover aspect-square"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={`Avatar for ${userName}`}
          fill={true}
          className="rounded-full object-cover aspect-square"
        />
      )}
    </div>
  );
};

export default UserAvatar;
