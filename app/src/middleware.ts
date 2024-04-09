import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("ACCESS_TOKEN");

  if (
    (token && request.nextUrl.pathname.startsWith("/auth/login")) ||
    (token && request.nextUrl.pathname.startsWith("/auth/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/sneakers", request.url));
  }

  if (
    !token && request.nextUrl.pathname.startsWith("/panel")
  ) {
    return NextResponse.redirect(new URL("/sneakers", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: "/sneakers",
// };
