import { parse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};

// url example: https://subdomain.huboneapp.com/path/to/resource
// domain: subdomain.huboneapp.com
// subdomain: subdomain
// path: /path
// key: path
// fullPath: /path/to/resource
// fullKey: path/to/resource

export async function middleware(request: NextRequest) {
  const { domain, subdomain, path, key } = parse(request);

  const allowedSubdomainRegex = new RegExp(
    `^(\\w+\\.)?(${process.env.NEXT_PUBLIC_ROOT_DOMAIN}|${LOCAL_ROOT_DOMAIN})$`,
    "i"
  );
  const res = NextResponse.next();

  // allow subdomains to make requests
  if (allowedSubdomainRegex.test(domain)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Access-Control-Allow-Origin", domain);
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

  if (
    key === "api" ||
    subdomain === "www" ||
    domain === LOCAL_ROOT_DOMAIN ||
    domain === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return res;
  }

  // if (subdomain === "dashboard") {
  //   console.log(`/(dashboard)`);
  //   return NextResponse.rewrite(new URL(`/(dashboard)`, request.url));
  // }

  return NextResponse.rewrite(
    new URL(`/hubspaces/${subdomain}${path}`, request.url)
  );
}

const LOCAL_ROOT_DOMAIN = "localtest.me:3000";
