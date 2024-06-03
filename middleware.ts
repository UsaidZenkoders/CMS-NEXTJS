import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith("/enrolments")) {
    const role = cookies().get("role")?.value;
    if (role ==="student") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/Auth/login", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/courses")) {
    const role = cookies().get("role")?.value;

    console.log(role)
    if (role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/Auth/login", req.url));
    }
  }
}