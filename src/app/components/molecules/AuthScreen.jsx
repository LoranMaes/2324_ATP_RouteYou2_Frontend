import Image from "next/image";
import React from "react";

export default function AuthScreen({ children }) {
  return (
    <div className="flex flex-col w-full box-border items-center lg:flex-row lg:h-full">
      <div className="w-full h-full flex-grow object-cover object-center lg:w-1/2 lg:h-full">
        <Image
          role="img"
          alt="Banner picture cycling"
          placeholder="blur"
          priority={true}
          sizes="(min-width: 1540px) calc(100vw - 720px), (min-width: 980px) calc(57.41vw - 73px), 100vw"
          src={require("@/app/assets/images/login_banner_cycling.jpg")}
          className="max-w-full h-full object-cover"
        />
      </div>
      {children}
    </div>
  );
}
