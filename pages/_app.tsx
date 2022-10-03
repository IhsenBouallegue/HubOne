import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";

import { HubOneContextProvider } from "../lib/context/HubOneContext";
import "../styles/globals.css";
import theme from "../theme";

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>HubOne</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <HubOneContextProvider>
            <Component {...pageProps} />
          </HubOneContextProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
