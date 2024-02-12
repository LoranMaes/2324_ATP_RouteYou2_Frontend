import React from "react";

const SkipLink = ({ href, title }) => {
  return (
    <a
      href={href}
      className="skiplink skiplink-focus bg-primary-green text-background border-background"
    >
      {title}
    </a>
  );
};

export default SkipLink;
