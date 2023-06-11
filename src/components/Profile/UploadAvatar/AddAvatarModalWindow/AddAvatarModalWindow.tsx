import s from './AddAvatarModalWindow.module.scss'
import TitleForAuth from "@/components/Auth/RecoveryPassword/TitleForAuth/TitleForAuth";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {useRouter} from "next/router";
import defaultAva from "@/assets/img/icons/picture.png";
import Image from "next/image";
import ButtonBlue from "@/components/Buttons/ButtonBlue/ButtonBlue";
import tempAva from '../../../../assets/img/icons/face2.jpg'

const AddAvatarModalWindow = () => {
  const router = useRouter()

  const onClickHandler = () => {
    return router.push('/profile-settings')
  }

  const pathImg = null
  return (
    <div className={s.modalWrapper}>
      <div className={s.modal}>
        <div className={s.title}>
          <TitleForAuth marginBottom={'0px'} text={'Add a Profile Photo'}/>
          <CloseIcon onClick={onClickHandler} style={{cursor: 'pointer'}}/>
        </div>
        {pathImg
          ? <div className={s.selectPhoto}>
            <div className={s.selectPhoto__block}>
              <div className={s.selectPhoto__icon}>
                <Image src={defaultAva} alt="Avatar" width={36} height={36}/>
              </div>
              <ButtonBlue title={'Select from Computer'} width={'100%'} disabled={false}/>
            </div>

          </div>
          : (
            <>
            <div className={s.avatar}>
              <Image className={s.avatarImg} src={tempAva} alt="Avatar" width={332} height={340}/>
              <div className={s.avatar__back}>
                <div className={s.avatar__back_inner}></div>
              </div>
            </div>
              <div className={s.button_conteiner}>
                <ButtonBlue title={'Save'} width={'86px'} disabled={false}/>
              </div>
            </>
          )
        }
      </div>

    </div>
  );
};

export default AddAvatarModalWindow;