import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {Provider} from "react-redux";
import {store} from "@/services/store";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>)
}