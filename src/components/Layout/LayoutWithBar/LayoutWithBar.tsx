import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/Layout/Layout";


export const LayoutWithBar:NextPage<PropsWithChildren> = ({ children }) => {
  return (
   <Layout>{children}</Layout>
  );
};
export function getLayout(page: ReactElement) {
  return <LayoutWithBar>{page}</LayoutWithBar>
}



