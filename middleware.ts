import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token && req.nextUrl.pathname !== "/") {
    console.log("test");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (icons folder)
     * - manifest.webmanifest (web manifest file)
     * - images (images folder)
     */
    "/((?!api|ingest|_next/static|_next/image|icons|favicon.ico|manifest.webmanifest|images|artist-tools|privacy-policy|terms-of-service).*)",
  ],
};
