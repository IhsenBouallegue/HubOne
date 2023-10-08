import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { Toaster } from "@/ui/toaster";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import theme from "../../theme";
import Providers from "./providers";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});
export const metadata = {
  title: "HubOne",
  description: "HubOne",
};

export default function RootLayout({ children }: { children: ReactNode[] }) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider theme={theme} forceColorScheme="light">
            <Notifications />
            <Analytics />
            <Toaster />
            <Providers>{children}</Providers>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
