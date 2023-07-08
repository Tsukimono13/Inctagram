import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "@/services/store";
import { useLoader } from "@/hooks/useLoader";
import '../styles/nProgress.css'
import { ReactElement, ReactNode } from "react";
import {FileProvider} from "@/hooks/fileContext/FileContext";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  useLoader();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <FileProvider>
        {getLayout(<Component {...pageProps} />)}
      </FileProvider>
    </Provider>);
}