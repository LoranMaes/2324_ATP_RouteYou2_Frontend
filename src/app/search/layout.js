import { openGraphShared, twitterShared } from "@/app/shared-metadata";

export const metadata = {
  title: "Search",
  description: "Search for RouteYou events",
  openGraph: {
    ...openGraphShared,
    url: "/search",
    title: "Search | RouteYou",
    description: "Search for RouteYou events",
  },
  twitter: {
    ...twitterShared,
    title: "Search | RouteYou",
    description: "Search for RouteYou events",
  },
};

export default function SearchLayout({ children }) {
  return <>{children}</>;
}
