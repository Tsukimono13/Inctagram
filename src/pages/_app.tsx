import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {Provider} from "react-redux";
import {store} from "@/services/store";

type GetLayoutType = (page: NextPageWithLayout) => NextPageWithLayout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayoutType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {


  const getLayout: GetLayoutType = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>)
}