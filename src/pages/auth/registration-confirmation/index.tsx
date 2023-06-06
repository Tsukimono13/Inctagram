import React, {useEffect} from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import {useRegistrationConfirmationMutation} from "@/services/authApi/authApi";
import Image from "next/image";
import regConfirmImg from '../../../assets/img/auth/regConfirmImg.png'
import {ContainerForConfirm} from "@/components/RegistrationConfirmation/ContainerForConfirm/ContainerForConfirm";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";

const RegistrationConfirmation = () => {

    const router = useRouter()

    const [registrationConfirmation] = useRegistrationConfirmationMutation()

    useEffect(() => {

        const {code} = router.query

        if (code) {
            registrationConfirmation({confirmationCode: code})
        }

    }, [])

    return (

        <ContainerForConfirm>
            <h1>Congratulations !</h1>
            <h2>Your email has been confirmed</h2>
            <ButtonBlue disabled={false} title={'Sign In'} width={185} callback={() => router.push('/signIn')}/>
            <Image src={regConfirmImg} alt={'regConfirmImg'}/>
        </ContainerForConfirm>

    )
}


RegistrationConfirmation.getLayout = getLayout

export default RegistrationConfirmation