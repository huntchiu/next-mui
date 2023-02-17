import React, { ReactElement, ReactNode, useState } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../helpers/createEmotionCache";
import lightTheme from "../config/theme";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
};

//创建一个包含emotion缓存的常量，并将其用作CacheProvider属性的默认值
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  const [queryClient] = useState(() => new QueryClient());
  //emotion CacheProvider组件为用户会话提供共享的客户端缓存
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider refetchInterval={0} session={session}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
