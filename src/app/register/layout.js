import React from "react";
import { openGraphShared, twitterShared } from "@/app/shared-metadata";

export const metadata = {
  title: "Register",
  description: "Register page for RouteYou event planner",
  openGraph: {
    ...openGraphShared,
    url: "/register",
    title: "Register",
    description: "Register page for RouteYou event planner",
  },
  twitter: {
    ...twitterShared,
    title: "Register",
    description: "Register page for RouteYou event planner",
  },
};

export default function RegisterLayout({ children }) {
  return <>{children}</>;
}
