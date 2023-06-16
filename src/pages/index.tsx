'use client'
import {NextPageWithLayout} from "@/pages/_app";

import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import {useEffect} from "react";
import { getLayout } from "@/components/Layout/LayoutWithBar/LayoutWithBar";

const Home = () => {

    const isSignedIn = useAppSelector(signedIn)

    const router = useRouter()

    useEffect(() => {

        isSignedIn ? router.push('/profile') : router.push('/signIn')

    }, [isSignedIn])


    return (
        <div>
            <h1>Hi Hello Yo-yo Hi</h1>
        </div>
    )
}

Home.getLayout = getLayout
export default Home;

