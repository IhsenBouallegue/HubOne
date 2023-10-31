import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const allowedSubdomainRegex = new RegExp(
    `^https?://(\\w+\\.)?(${process.env.NEXT_PUBLIC_ROOT_DOMAIN}|localhost:3000)$`,
    "i"
  );
  const res = NextResponse.next();
  const origin = request.headers.get("origin");
  // allow subdomains to make requests
  if (origin && allowedSubdomainRegex.test(origin)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Access-Control-Allow-Origin", origin);
    requestHeaders.set(
      "Access-Control-Allow-Methods",
      "GET, PATCH, POST, OPTIONS, DELETE, HEAD"
    );
    requestHeaders.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  // ignore these routes
  if (/(api|sign-in|sign-up|user)/.test(url.pathname)) {
    return res;
  }
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  // Get subdomain of request (e.g. demo, www, hubspace1)
  const subdomain = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  );
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // rewrite these subdomains/hostnames to the root domain
  if (
    subdomain === "www" ||
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`${path}`, request.url));
  }

  return NextResponse.rewrite(
    new URL(`/hubspaces/${subdomain}${path}`, request.url)
  );
}
