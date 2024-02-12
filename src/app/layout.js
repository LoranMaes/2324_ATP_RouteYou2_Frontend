import "./globals.css";
import { Open_Sans } from "next/font/google";
import AppHeader from "./components/molecules/AppHeader";
import SkipLink from "@/app/components/atoms/SkipLink";
import { openGraphShared, twitterShared } from "@/app/shared-metadata";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  applicationName: "RouteYou",
  title: {
    template: "%s | RouteYou",
    default: "RouteYou Event Planner",
    absolute: "Event Dashboard | RouteYou",
  },
  openGraph: {
    ...openGraphShared,
    url: "/",
    title: "Event Dashboard | RouteYou",
    description:
      "Plan your event with RouteYou. Create a route, add points of interest, and share your event with your friends.",
  },
  twitter: {
    ...twitterShared,
    title: "Event Dashboard | RouteYou",
    description:
      "Plan your event with RouteYou. Create a route, add points of interest, and share your event with your friends.",
  },
  manifest: "/manifest.json"
};

const poppins = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: ["--font-poppins"],
});

// const isLoggedIn = async () => {
//   try {
//     const token = cookies().get("token").value;
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     return data.user;
//   } catch (error) {
//     return false;
//   }
// };
// const user = isLoggedIn();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body
        className={`box-border font-poppins flex flex-col min-h-screen text-primary bg-background h-screen`}
      >
        <SkipLink href="#main-content" title="Skip to main content" />
        {/* Header component here */}
        <AppHeader key="header" user={{}}></AppHeader>

        <main
          id="main-content"
          className="box-border flex flex-col flex-grow w-full relative z-50 bg-background"
        >
          {children}
        </main>

        {/* Footer component here */}
      </body>
    </html>
  );
}
