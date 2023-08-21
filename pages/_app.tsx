import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { ClerkProvider } from "@clerk/nextjs";
import "@styles/App.css";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import theme from "../theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>HubOne | The Bookmark Hub</title>
        {/* <link rel="shortcut icon" href="/logo/hubone_logo.svg" /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <ClerkProvider
          {...pageProps}
          appearance={{
            variables: {
              colorPrimary: theme.colors?.primary?.[4],
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Notifications />
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </ClerkProvider>
      </MantineProvider>
    </>
  );
}
