import React from 'react';
import TitleForAuth from "@/components/Auth/RecoveryPassword/TitleForAuth/TitleForAuth";
import s from "src/components/Auth/RecoveryPassword/SentEmail/SentEmail.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import TextForAuth from "@/components/Auth/RecoveryPassword/TextForAuth/TextForAuth";
import variables from 'src/styles/variables.module.scss';
import ButtonBlue from "@/components/Auth/RecoveryPassword/Button/ButtonBlue";
import {useRouter} from "next/router";

const SentEmail = () => {
    const router = useRouter()
    const email = (router.query?.email)
    const onClickHandler = () => {
        return router.push('/signIn')
    }
    return (
        <div className={s.main}>
            <div className={s.title}>
                <TitleForAuth marginBottom={'0px'} text={'Email sent'}/>
                <CloseIcon onClick={onClickHandler} style={{cursor: 'pointer'}}/>
            </div>
            <div className={s.subTitle}>
                <TextForAuth text={`We have sent a link to confirm your email to ${email}`}
                             color={variables.whiteColor}
                             marginBottom={'18px'}
                             fontSize={'16px'}
                />
                <div style={{marginBottom: '6px', textAlign: 'end'}}>
                    <ButtonBlue
                        callback={onClickHandler}
                        disabled={false}
                        title={'OK'}
                        width={'96px'}
                        type={'button'}
                    />
                </div>
            </div>
        </div>


    );
};

export default SentEmail;