import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layout/Layout";
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {Button} from "@mui/material";

const Home: NextPageWithLayout = () => {


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

