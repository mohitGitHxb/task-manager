import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export function middleware(request) {
  console.log("MIDDLEWARE EXECUTED................................");
  // return NextResponse.json(new URL("/home",request.url));
  const authToken = request.cookies.get("authToken")?.value;
  // no need to check for login and signup
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return;
  }

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname == "/signup";

  if (loggedInUserNotAccessPaths) {
    // access not secured route
    if (authToken) {
      return NextResponse.redirect(new URL("/show-tasks", request.url));
    }
  } else {
    // accessing secured route

    if (!authToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            message: "Access Denied !!",
            success: false,
          },
          {
            status: 401,
          }
        );
      }

      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      // const res = jwt.verify(authToken, process.env.JWT_SECRET);
      // If verification is successful, continue with the request
      return NextResponse.next();
      // return NextResponse.json(
      //   {
      //     message: "TOken verification Failed",
      //     success: false,
      //   },
      //   {
      //     status: 401,
      //     statusText: "Token verification failed",
      //   }
      // );
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/add-task",
    "/login",
    "/signup",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
