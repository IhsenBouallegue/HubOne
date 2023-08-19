import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { ClerkProvider } from "@clerk/nextjs";
import "@styles/App.css";
import Head from "next/head";
import theme from "../theme";

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
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
            <Component {...pageProps} />
          </QueryClientProvider>
        </ClerkProvider>
      </MantineProvider>
    </>
  );
}
