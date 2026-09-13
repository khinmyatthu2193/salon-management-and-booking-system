import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require auth
  const publicPaths = ["/", "/login", "/register"];
  const isPublicPath = publicPaths.some((path) => pathname === path);

  // Protected routes that require auth
  const protectedPaths = ["/dashboard", "/salons", "/managers", "/staff", "/services", "/appointments", "/schedule", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));

  // If accessing protected route without token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login/register with token, redirect to dashboard
  if (isPublicPath && token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
