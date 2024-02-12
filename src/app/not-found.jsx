import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex grow justify-center items-center gap-[5rem]">
      <Image
        src={require("@/app/assets/images/route-you-logo-error-md.svg")}
        alt="RouteYou Error logo"
        priority
        width={64}
        height={91}
      />
      <div className="flex flex-col gap-[0.4rem]">
        <h1 className="text-h1 font-bold">404</h1>
        <p className="font-semibold mb-[0.8rem]">Page not found</p>
        <p>The page you are looking for does not exist.</p>
        <Link href="/" className="underline text-primary-green">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
