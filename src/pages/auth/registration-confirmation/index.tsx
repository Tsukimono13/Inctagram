import React, {useEffect} from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {useRouter} from "next/router";
import {useRegistrationConfirmationMutation} from "@/services/authApi/authApi";
import Image from "next/image";
import regConfirmImg from '../../../assets/img/auth/regConfirmImg.png'
import {ContainerForConfirm} from "@/components/Auth/RegistrationConfirmation/ContainerForConfirm/ContainerForConfirm";
import ButtonBlue from "@/components/Auth/RecoveryPassword/Button/ButtonBlue";
import CustomButton from "@/assets/common/CustomButton/CustomButton";

const RegistrationConfirmation = () => {

    const router = useRouter()

    const {code} = router.query

    const [registrationConfirmation] = useRegistrationConfirmationMutation()

    useEffect(() => {
        if (code) {
            registrationConfirmation({confirmationCode: code})
        }

    }, [code])

    return (

        <ContainerForConfirm>
            <h1>Congratulations !</h1>
            <h2>Your email has been confirmed</h2>

            <ButtonBlue disabled={false} title={'Sign In'} width={185} callback={() => router.push('/signIn')}/>
            <Image src={regConfirmImg} alt={'regConfirmImg'}/>
        </ContainerForConfirm>

    )
}

const DatePicker = (props: any) =>   <input type={"date"} {...props}/>


RegistrationConfirmation.getLayout = getLayout

export default RegistrationConfirmation