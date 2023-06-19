import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import HeaderProfile from "@/components/header/headerProfile";
import Sidebar from "@/components/sidebar/Sidebar";
import s from "./layoutWithBar.module.scss"


export const LayoutWithBar:NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
    <div className={s.header}>
      <HeaderProfile/>
    </div>
      <div className={s.sidebar}>
        <Sidebar/>
      </div>
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
};
export function getLayout(page: ReactElement) {
  return <LayoutWithBar>{page}</LayoutWithBar>
}



