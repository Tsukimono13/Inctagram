import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "@/services/store";
import { useLoader } from "@/hooks/useLoader";
import '../styles/nProgress.css'

type GetLayoutType = (page: NextPageWithLayout) => NextPageWithLayout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayoutType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  useLoader();
  const getLayout: GetLayoutType = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>);
}