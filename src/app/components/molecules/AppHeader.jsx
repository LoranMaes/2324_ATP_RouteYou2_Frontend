"use client";
import AppSearchBar from "@/app/components/atoms/AppSearchBar";
import AppButton from "@/app/components/atoms/AppButton";
import Image from "next/image";
import Icon from "@mdi/react";
import { useEffect, useRef, useState } from "react";
import {
  mdiShieldOutline,
  mdiFlagVariantOutline,
  mdiCalendarOutline,
  mdiAccountCircleOutline,
  mdiLogin,
  mdiCalendarPlusOutline,
  mdiLogout,
  mdiCalendarSearchOutline,
} from "@mdi/js";
import HttpService from "@/services/http.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/services/auth.service";
import Cookies from "js-cookie";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  // const parsedUser = JSON.parse(user?.value || "{}");
  let [expanded, setExpanded] = useState(true);
  const [userData, setUserData] = useState({
    user: null,
    isOrganizer: false,
  });

  const handleHamburger = () => setExpanded(!expanded);

  const logout = async () => {
    try {
      const logout = await HttpService.post("/logout");
      Cookies.set("token", "", {
        expires: -1,
      });
      setUserData({ user: false, isOrganizer: false });
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      if (error?.response?.status === 401) {
        Cookies.set("token", "", {
          expires: -1,
        });
        setUserData({ user: false, isOrganizer: false });
        localStorage.removeItem("user");
        router.push("/login");
      }
      console.log(error);
    }
  };
  /**
   * AppHeader component.
   *
   * @component
   * @param {Function} logout - The function to be executed when a logout button is clicked.
   * @param {Function} handleHamburger - The function to be executed when the hamburger button is clicked.
   * @returns {React.Element} A React header element.
   */

  const hamburgerLine =
    "h-1 w-full rounded-full bg-primary transition-all ease transform duration-300";
  const behindActiveLink =
    "before:absolute before:bg-primary-green before:w-full before:h-full before:rounded-full before:min-w-full lg:before:bg-background";
  const hoverLink =
    "flex relative w-fit after:absolute after:bg-primary-green after:h-1 after:w-0 after:bottom-2 after:left-0 after:rounded-full after:mx-[50%] hover:after:mx-[12.5%] hover:after:w-3/4 after:transition-all after:duration-300";

  // Check if user is logged in

  const navRef = useRef(null);
  useEffect(() => {
    navRef.current.style.marginBottom = expanded
      ? "0"
      : `-${navRef.current.offsetHeight}px`;

    // Skip all elements in the navigation when it is collapsed
    const elements = navRef.current.querySelectorAll("a, button, input");
    elements.forEach((element) => {
      element.setAttribute("tabindex", expanded ? 0 : -1);
    });
  }, [expanded]);

  const getUser = async () => {
    const c = Cookies.get("token");
    if (!c) return;
    try {
      const u = await HttpService.get("/user");

      if (u.status === 401) Cookies.set("token", "", { expires: -1 });
      setUserData({
        user: u.data.user,
        isOrganizer: u.data.user.organisation_id ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUserData({
        user: userDataFromStorage,
        isOrganizer: userDataFromStorage.organisation_id ? true : false,
      });
    } else {
      getUser();
    }
  }, [router, pathname]);

  return (
    <header
      className={`w-full flex flex-row justify-between flex-wrap h-fit transition-all duration-700 lg:shadow-md lg:z-30 lg:max-w-full lg:p-4`}
      aria-label="Header"
    >
      <nav
        className="flex flex-col relative w-full h-full lg:flex-row lg:items-center lg:pb-20"
        role="navigation"
      >
        <div className="w-full flex flex-row items-center justify-between h-fit px-8 py-4 bg-background relative z-10 lg:w-fit">
          <Link href={"/"}>
            <Image
              priority={true}
              id="logo-RouteYou-mobile"
              src={require("../../assets/icons/logo_routeyou.svg")}
              alt="Logo of RouteYou"
            ></Image>
          </Link>
          <button
            type="button"
            aria-label="Hamburger menu"
            className="border-none bg-none h-12 w-12 flex flex-col justify-around lg:hidden"
            onClick={handleHamburger}
            aria-expanded={expanded}
          >
            <span
              className={`${hamburgerLine} ${
                expanded ? "rotate-45 translate-y-4" : ""
              }`}
            ></span>
            <span
              className={`${hamburgerLine} ${
                expanded ? "w-0 mx-[50%] opacity-0" : ""
              }`}
            ></span>
            <span
              className={`${hamburgerLine} ${
                expanded ? "-rotate-45 -translate-y-4" : ""
              }`}
            ></span>
          </button>
        </div>
        <div
          className={`flex flex-col px-8 py-4 w-full h-full ${
            !expanded ? "lg:!mb-0" : ""
          } mx-auto bg-background justify-between max-w-3xl transition-all duration-700 gap-4 ease-in-out lg:flex-row lg:max-w-full lg:gap-8 lg:items-center`}
          ref={navRef}
        >
          <AppSearchBar
            idButton="search_events_btn"
            idLabel="search_events_input"
            placeholder="Search for events"
          ></AppSearchBar>
          <ol className="flex flex-col gap-6 lg:absolute lg:flex-row lg:left-0 lg:bottom-0 lg:z-10">
            <li className={hoverLink}>
              <Link
                href="https://help.routeyou.com/en/topic/view/82/routeyou-the-platform"
                className="flex flex-row gap-6 no-underline p-6 whitespace-nowrap"
              >
                <Icon
                  path={mdiFlagVariantOutline}
                  title="Take the tour"
                  id="take_the_tour"
                  className="w-8"
                  color="rgba(115, 115, 115, 1)"
                ></Icon>
                <p className="font-bold text-accent-gray lg:whitespace-nowrap">
                  Take the tour
                </p>
              </Link>
            </li>
            <li className={hoverLink}>
              <Link
                href="https://help.routeyou.com/en/topic/view/315/routeyou-product-overview"
                className="flex flex-row gap-6 no-underline p-6"
              >
                <Icon
                  path={mdiShieldOutline}
                  title="For professionals"
                  id="for_professionals"
                  className="w-8"
                  color="rgba(115, 115, 115, 1)"
                ></Icon>
                <p className="font-bold text-accent-gray lg:whitespace-nowrap">
                  For professionals
                </p>
              </Link>
            </li>
            <li className={hoverLink}>
              <Link
                href="/search"
                className="flex flex-row gap-6 no-underline p-6"
              >
                <Icon
                  path={mdiCalendarSearchOutline}
                  title="Search events"
                  id="search_events"
                  className="w-8"
                  color="rgba(115, 115, 115, 1)"
                ></Icon>
                <p className="font-bold text-accent-gray lg:whitespace-nowrap">
                  Search events
                </p>
              </Link>
            </li>
            {userData.user && (
              <li
                key="my_events"
                className={`relative w-full ${
                  pathname === "/" ? behindActiveLink : ""
                } ${hoverLink}`}
              >
                <Link
                  href="/"
                  className="flex flex-row gap-6 no-underline p-6 relative z-10"
                >
                  <Icon
                    path={mdiCalendarOutline}
                    title="My events"
                    id="my_events"
                    className={`w-8 ${
                      pathname === "/" ? "text-background" : "text-accent-gray"
                    } lg:text-accent-gray`}
                  ></Icon>
                  <p
                    className={`font-bold lg:whitespace-nowrap ${
                      pathname === "/"
                        ? "text-background lg:text-accent-gray"
                        : "text-accent-gray"
                    }`}
                  >
                    My events
                  </p>
                </Link>
              </li>
            )}
            {userData.isOrganizer && (
              <li
                key="create_event"
                className={`relative w-full ${
                  pathname === "/create" ? behindActiveLink : ""
                } ${hoverLink}`}
              >
                <Link
                  href="/create"
                  className={`flex flex-row gap-6 no-underline p-6 relative z-10`}
                >
                  <Icon
                    path={mdiCalendarPlusOutline}
                    title="Create an event"
                    id="create_event"
                    className={`w-8 ${
                      pathname === "/create"
                        ? "text-background"
                        : "text-accent-gray"
                    } lg:text-accent-gray`}
                  ></Icon>
                  <p
                    className={`font-bold lg:whitespace-nowrap ${
                      pathname === "/create"
                        ? "text-background lg:text-accent-gray"
                        : "text-accent-gray"
                    }`}
                  >
                    Create an event
                  </p>
                </Link>
              </li>
            )}
          </ol>

          <div className="flex flex-col gap-4 pb-6 pt-40 lg:h-full lg:flex-row lg:p-0">
            <Link
              href="https://www.routeyou.com/route/planner/0/route-planner"
              className="no-underline w-full text-center rounded-xl px-6 py-2 font-semibold text-background bg-primary-green h-fit flex justify-center items-center lg:hover:translate-y-1 lg:hover:transition-all lg:transition-all lg:h-full lg:text-base lg:px-2.4rem lg:py-[.8rem] lg:w-fit lg:whitespace-nowrap"
            >
              Plan a route
            </Link>
            <Link
              href="https://www.routeyou.com/upgrade"
              className="no-underline w-full text-center rounded-xl px-6 py-2 font-semibold text-background bg-accent-red h-fit flex justify-center items-center lg:hover:translate-y-1 lg:hover:transition-all lg:transition-all lg:h-full lg:text-base lg:px-2.4rem lg:py-[.8rem] lg:w-fit lg:whitespace-nowrap"
            >
              Upgrade
            </Link>
            {userData.user ? (
              <AppButton
                key="logout"
                handleClick={logout}
                iconLeft={mdiLogout}
                title_left="logout_button"
                gap="4"
                bg_color="bg-accent-red"
                hoverAnimationLeft={true}
                innerText="Logout"
                type="button"
                name="logout_button"
                className="border-none"
                data-testid="logout-button"
              ></AppButton>
            ) : (
              <Link
                href="/login"
                key="login"
                className="no-underline w-full text-center rounded-xl px-6 py-2 gap-4 font-semibold text-background bg-primary-green h-fit flex justify-center items-center lg:hover:translate-y-1 lg:hover:transition-all lg:transition-all lg:h-full lg:text-base lg:px-2.4rem lg:py-[.8rem] lg:w-fit lg:whitespace-nowrap"
              >
                Log in
                <Icon
                  path={mdiLogin}
                  color="#FAFAFA"
                  className="w-8 lg:w-10"
                ></Icon>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
