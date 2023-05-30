import React from 'react';
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import s from "./SentEmail.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import variables from '../../styles/variables.module.scss';
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";

const SentEmail = () => {

  return (
    <div className={s.main}>
      <div className={s.title}>
        <TitleForAuth marginBottom={'0px'} text={'Email sent'}/>
        <CloseIcon/>
        </div>
      <div className={s.subTitle}>
        <TextForAuth text={'We have sent a link to confirm your email to epam@epam.com'}
                     color={variables.whiteColor}
                     marginBottom={'18px'}
                     fontSize={'16px'}
                     />
        <div style={{marginBottom: '6px', textAlign:'end'}}>
          <ButtonBlue
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