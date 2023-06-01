import React from 'react';
import {ContainerForAuth} from "@/components/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import variables from "@/styles/variables.module.scss";
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";
import Image from "next/image";
import resendImg from '../../../assets/img/auth/recent-link.png'
import Link from "next/link";

const InvalidLink = () => {

  return (
    <ContainerForAuth border={'none'} background={'none'}>
      <TitleForAuth marginBottom={'19px'} text={'Email verification link invalid'}/>
      <TextForAuth
        textAlign={'center'}
        fontSize={'16px'}
        color={variables.whiteColor}
        marginBottom={'30px'}
        text={'Looks like the verification link has expired. Not to worry, we can send the link again'}
      />
        <Link href={'/recovery-password'} style={{display:"block",marginBottom: '31px',width:'100%'}}>
          <ButtonBlue
            disabled={false}
            title={'Resend Link'}
            width={'100%'}
            type={'button'}
          />
        </Link>
      <Image src={resendImg} alt={'Resend link again'} width={330}/>
    </ContainerForAuth>
  );
};

export default InvalidLink;