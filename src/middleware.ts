import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware function to handle protected routes and user authentication.
 *
 * @async
 * @function
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse|undefined>} A promise that resolves to a NextResponse if a redirect occurs, otherwise undefined.
 */
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const user = await userIsValid(req);
  const routes = ["/login", "/register"];
  const protectedRoutes = ["/", "/create", "/login", "/register"];
  
  const PUBLIC_FILE = /\.(.*)$/;
  const isPublicFile = PUBLIC_FILE.test(req.nextUrl.pathname);
  if (!protectedRoutes.includes(req.nextUrl.pathname) || isPublicFile)
    return NextResponse.next();

  if (
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register") &&
    req.cookies.has("token") &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    if (!user.ok) {
      req.cookies.delete("token");
    } else {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (
    !req.cookies.has("token") &&
    !routes.includes(req.nextUrl.pathname) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (req.cookies.has("token") && !req.nextUrl.pathname.startsWith("/_next")) {
    if (!user.ok && req.nextUrl.pathname !== "/login") {
      url.pathname = "/login";
      req.cookies.delete("token");
      return NextResponse.redirect(url);
    } else if (req.nextUrl.pathname === "/login") {
      req.cookies.delete("token");
    }
  }
  if (req.nextUrl.pathname === "/create") {
    if (!user?.user?.organisation_id) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

/**
 * Checks if a user is valid by making a request to the /api/user endpoint.
 *
 * @async
 * @function
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<Response>} A promise that resolves to the response from the /api/user endpoint.
 */
const userIsValid = async (req: NextRequest) => {
  let user = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.get("token").value}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    user = data.user ? data.user : null;
    return { user, ok: true };
  } catch (err) {
    return { user, ok: false };
  }

  return user;
};

export const config = {
  // Add protected routes here
  matcher: ["/", "/create", "/search", "/:slug*", "/login", "/register"],
};
