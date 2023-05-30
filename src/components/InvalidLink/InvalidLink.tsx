import React from 'react';
import {ContainerForAuth} from "@/components/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import variables from "@/styles/variables.module.scss";
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";
import Image from "next/image";
import resendImg from '../../../src/assets/img/auth/recent-link.png'
const InvalidLink = () => {
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
            disabled={false}
            title={'Resend Link'}
            width={'100%'}
            type={'button'}
          />
        </div>
        <Image src={resendImg} alt={'Resend link again'} width={473}/>
      </ContainerForAuth>
    );
};

export default InvalidLink;