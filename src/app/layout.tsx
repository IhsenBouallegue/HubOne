import "./globals.css";

import { mainFont } from "@/lib/fonts";
import { Toaster } from "@/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "HubOne",
  description: "HubOne",
};

export default function RootLayout({ children }: { children: ReactNode[] }) {
  return (
    <html lang="en" className={mainFont.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SessionProvider>
          <Analytics />
          <Toaster />
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
