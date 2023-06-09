import s from 'src/components/Header/header.module.scss'
import {Button} from "@mui/material"
import {useLogOutMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import {useEffect} from "react";


export const Header = () => {

    const isSignedIn = useAppSelector(signedIn)

    const router = useRouter()

    const logOut = () => {

    }

    useEffect(() => {

        isSignedIn ? router.push('/profile') : router.push('/signIn')

    }, [isSignedIn])


    return (
        <div className={s.header}>
            <Link href={'/'}><h2 className={s.title}>Inctagram</h2></Link>
            {!isSignedIn? '' :<Link href={'/signIn'}><h2 className={s.logOut} onClick={logOut}>[→ Log Out</h2></Link>}
        </div>
    )
}