import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /_next (Next.js internals)
     * 2. /_static (inside /public)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!_next/|_static/|logo/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const allowedSubdomainRegex = new RegExp(
    `^https?://(w+.)?(${process.env.NEXT_PUBLIC_ROOT_DOMAIN}|localhost:3000)$`,
    "i"
  );
  const res = NextResponse.next();
  const origin = req.headers.get("origin");

  // allow subdomains to make requests
  if (origin && allowedSubdomainRegex.test(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET, PATCH, POST, OPTIONS, DELETE, HEAD"
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  // ignore api routes
  if (url.pathname.includes("api")) {
    return res;
  }
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // rewrites for app pages
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // const session = await getToken({ req });
    // if (!session && path !== "/login") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
    // if (session && path === "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  const currentHost = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  );
  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
}
