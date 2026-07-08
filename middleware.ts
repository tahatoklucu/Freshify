import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.redirect(new URL("/error", request.url));
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
  
}

export const config = {
    matcher: ["/admin/:path*"],
};
