import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If authenticated but no role, redirect to onboarding (except if already there)
    if (token && !token.role && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Protect creator routes
    if (pathname.startsWith("/creator") && token?.role !== "CREATOR") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Protect agency routes
    if (pathname.startsWith("/agency") && token?.role !== "AGENCY") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        // Public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/explore") ||
          pathname.startsWith("/profile") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
