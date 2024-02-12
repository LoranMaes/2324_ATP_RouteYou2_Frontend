import { openGraphShared } from "../shared-metadata";

export const metadata = {
  title: "Create event",
  description: "Create a RouteYou event",
  openGraph: {
    ...openGraphShared,
    url: "/create",
  },
};

export default function CreateLayout({ children }) {
  return <>{children}</>;
}
