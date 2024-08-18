import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/signin", "/signup", "/", "/products", "/cart"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl.pathname;

  const isPublic =
    url.startsWith("/signin") || url.startsWith("/signup") || url === "/";

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
