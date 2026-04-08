import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If user already has a role and tries to access onboarding, send to dashboard
    if (token?.role && pathname === "/onboarding") {
      const dest = token.role === "CREATOR" ? "/creator" : "/agency";
      return NextResponse.redirect(new URL(dest, req.url));
    }

    // If authenticated but no role yet, redirect to onboarding
    if (token && !token.role && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Protect creator dashboard
    if (pathname.startsWith("/creator") && token?.role !== "CREATOR") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Protect agency dashboard
    if (pathname.startsWith("/agency") && token?.role !== "AGENCY") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        // Public routes — no token required
        if (
          pathname === "/" ||
          pathname.startsWith("/explore") ||
          pathname.startsWith("/profile") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/auth/redirect") ||
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
