import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pages } from "@/app/lib/pages";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const nextPathname = req.nextUrl.pathname;
  const isPublic =
    nextPathname === pages.public.login.href ||
    nextPathname === pages.public.register.href;

  if (!token && !isPublic) {
    return NextResponse.rewrite(new URL(pages.public.login.href, req.nextUrl));
  } else if (!!token && isPublic) {
    return NextResponse.rewrite(new URL(pages.auth.home.href, req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/home", "/my-tasks", "/add-task"],
};
