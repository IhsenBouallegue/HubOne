import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@styles/App.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ClerkProvider } from "@clerk/nextjs";

import theme from "theme";
import Providers from "./providers";

export const metadata = {
  title: "HubOne",
  description: "HubOne",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#ff8d00",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <ColorSchemeScript forceColorScheme="light" />
        </head>
        <body>
          <MantineProvider theme={theme} forceColorScheme="light">
            <Notifications />
            <Providers>{children}</Providers>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}