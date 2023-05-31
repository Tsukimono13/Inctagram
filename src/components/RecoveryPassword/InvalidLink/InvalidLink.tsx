import React from 'react';
import {ContainerForAuth} from "@/components/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import variables from "@/styles/variables.module.scss";
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";
import Image from "next/image";
import resendImg from '../../../assets/img/auth/recent-link.png'
import {useRouter} from "next/router";
import {useCheckRecoveryCodeMutation, useForgotPasswordMutation} from "@/services/authApi/authApi";

const InvalidLink = () => {
  const router = useRouter()
  const [checkRecoveryCode, {isLoading, isError}] = useCheckRecoveryCodeMutation()
  const [forgotPassword] = useForgotPasswordMutation()
  const resendLink = () => {
    checkRecoveryCode({recoveryCode: router.query.code as string})
      .unwrap()
      .then(() => router.push('/signIn'))
      .catch((err) => console.log(err))
  }
  return (
    <ContainerForAuth>
      <TitleForAuth marginBottom={'19px'} text={'Email verification link invalid'}/>
      <TextForAuth
        fontSize={'16px'}
        color={variables.whiteColor}
        marginBottom={'30px'}
        text={'Looks like the verification link has expired. Not to worry, we can send the link again'}
      />

      <div style={{marginBottom: '31px'}}>
        <ButtonBlue
          callback={resendLink}
          disabled={false}
          title={'Resend Link'}
          width={'100%'}
          type={'button'}
        />
      </div>
      <Image src={resendImg} alt={'Resend link again'} width={330}/>
    </ContainerForAuth>
  );
};

export default InvalidLink;