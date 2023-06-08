import {NextPage} from "next";
import {PropsWithChildren, ReactElement} from "react";
import {Header} from "../Header/Header";
import s from './layout.module.css'

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
        <div className={s.container}>
            <Header/>
            <div>{children}</div>
        </div>
    );
}

export const getLayout = (page: ReactElement) =>  <Layout>{page}</Layout>
export type GetLayoutType = typeof getLayout;