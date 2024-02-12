"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

/**
 * Renders a wrapper component for sharing content on social media platforms.
 * @returns {JSX.Element} The rendered ShareWrapper component.
 */
const ShareWrapper = () => {
  const pathname = usePathname();
  return (
    <ul className="flex gap-5 flex-wrap">
      <li>
        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
          aria-label="share-on-facebook"
          hashtag={"#routeyou"}
          blankTarget
        >
          <FacebookIcon size={32} round bgStyle={{ fill: "#222" }} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
          aria-label="share-on-twitter"
          title="Take a look at this event!"
          blankTarget
        >
          <TwitterIcon size={32} round bgStyle={{ fill: "#222" }} />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton
          url={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
          aria-label="share-on-linkedin"
        >
          <LinkedinIcon size={32} round bgStyle={{ fill: "#222" }} />
        </LinkedinShareButton>
      </li>
      <li>
        <WhatsappShareButton
          aria-label="share-on-whatsapp"
          url={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
          title="Take a look at this event!"
          separator=":: "
          blankTarget
        >
          <WhatsappIcon size={32} round bgStyle={{ fill: "#222" }} />
        </WhatsappShareButton>
      </li>
    </ul>
  );
};

export default ShareWrapper;
