import {NextPage} from "next";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import {Header} from "../Header/Header";
import s from './layout.module.css'


type LayoutProps = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {

    return (
        <div className={s.container}>
            <Header/>
            <div>{children}</div>
        </div>
    );
}

export const getLayout = (page: ReactElement) =>  <Layout>{page}</Layout>
export type GetLayoutType = typeof getLayout;