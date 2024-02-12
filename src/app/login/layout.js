import { openGraphShared, twitterShared } from "@/app/shared-metadata";

export const metadata = {
  title: "Login",
  description: "Login page for RouteYou event planner",
  openGraph: {
    ...openGraphShared,
    url: "/login",
    title: "Login | RouteYou",
    description: "Login page for RouteYou event planner",
  },
  twitter: {
    ...twitterShared,
    title: "Login | RouteYou",
    description: "Login page for RouteYou event planner",
  },
};

export default function LoginLayout({ children }) {
  return <>{children}</>;
}
