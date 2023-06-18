'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import {useEffect} from "react";
import s from "./home.module.scss"


const Home = () => {

    const isSignedIn = useAppSelector(signedIn)

    const router = useRouter()

   /* useEffect(() => {

        isSignedIn ? router.push('/profile') : router.push('/signIn')

    }, [isSignedIn])*/


    return (
            <div className={s.wrapper}>
                <h1 className={s.title}>Inctagram</h1>
            </div>
    )
}


export default Home;

