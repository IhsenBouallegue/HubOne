import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { AuthObject } from "@clerk/nextjs/dist/types/server";
import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_PATH = "dashboard";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};

export async function routingMiddleware(
  auth: AuthObject & {
    isPublicRoute: boolean;
    isApiRoute: boolean;
  },
  req: NextRequest
) {
  const url = req.nextUrl;
  const allowedSubdomainRegex = new RegExp(
    `^https?://(\\w+\\.)?(${process.env.NEXT_PUBLIC_ROOT_DOMAIN}|localhost:3000)$`,
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

  // ignore these routes
  if (/(api|sign-in|sign-up|user)/.test(url.pathname)) {
    return res;
  }
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;
  const dashboardRegex = new RegExp(
    `^https?://(${process.env.NEXT_PUBLIC_ROOT_DOMAIN}|localhost:3000)/${DASHBOARD_PATH}`,
    "i"
  );
  // rewrites for dashboardd pages
  if (dashboardRegex.test(url.href)) {
    const signInPath = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
    const signUpPath = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
    // TODO: just returning to home for no if env variables not founnd
    if (!signInPath || !signUpPath)
      return NextResponse.rewrite(new URL("/", req.url));
    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    const sanitisedPath = path.replace(`/${DASHBOARD_PATH}`, "");

    return NextResponse.rewrite(
      new URL(
        `/${DASHBOARD_PATH}${sanitisedPath === "/" ? "" : sanitisedPath}`,
        req.url
      )
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`${path}`, req.url));
  }

  const subdomain = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  );
  return NextResponse.rewrite(
    new URL(`/hubspaces/${subdomain}${path}`, req.url)
  );
}

export default authMiddleware({
  beforeAuth: () => console.time("auth"),
  afterAuth: () => console.timeEnd("auth"),
  // afterAuth: (auth, req) => routingMiddleware(auth, req),
  publicRoutes: ["/"],
  debug: true,
});
