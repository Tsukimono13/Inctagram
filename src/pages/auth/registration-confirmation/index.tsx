import React, {useEffect} from 'react';
import {getLayout} from "@/components/layout/Layout";
import {useRouter} from "next/router";
import {useRegistrationConfirmationMutation} from "@/services/authApi/authApi";
import Image from "next/image";
import regConfirmImg from '../../../assets/img/auth/regConfirmImg.png'
import {ContainerForConfirm} from "@/components/auth/registrationConfirmation/containerForConfirm/ContainerForConfirm";
import CustomButton from "@/components/customComponents/customButton/CustomButton";

const RegistrationConfirmation = () => {

    const router = useRouter()

    const {code} = router.query

    const [registrationConfirmation,{error}] = useRegistrationConfirmationMutation()




    useEffect(() => {
        const checkCodeAndRedirect = async () => {
            if (code) {
                await registrationConfirmation({confirmationCode: code});
            }

            if (error) {
                await router.push('/404');
            }
        };

        checkCodeAndRedirect();

    }, [])


    const handler = async () => {
        console.log(code)
       await router.push('/signIn')
    }

    return (

        <ContainerForConfirm>
            <h1>Congratulations !</h1>
            <h2>Your email has been confirmed</h2>

            <CustomButton callback={handler}>Sign In</CustomButton>
            <Image src={regConfirmImg} alt={'regConfirmImg'}/>
        </ContainerForConfirm>

    )
}

RegistrationConfirmation.getLayout = getLayout

export default RegistrationConfirmation