import {NextPage} from "next";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import {Header} from "@/components/header/Header";
import s from './layout.module.css'


export const Layout:NextPage<PropsWithChildren> = ({ children }) => {

    return (
        <div className={s.container}>
            <Header/>
            <div>{children}</div>
        </div>
    );
}

export const getLayout = (page: ReactElement) =>  <Layout>{page}</Layout>
export type GetLayoutType = typeof getLayout;
