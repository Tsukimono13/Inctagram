import React from 'react';
import Avatar from "@/components/Profile/UploadAvatar/Avatar/Avatar";
import ButtonTransparent from "@/components/Buttons/ButtonTransparent/ButtonTransparent";
import tempAva from '../../../assets/img/icons/face2.jpg'
import s from './UploadAvatar.module.scss'
import AddAvatarModalWindow from "@/components/Profile/UploadAvatar/AddAvatarModalWindow/AddAvatarModalWindow";


const UploadAvatar = () => {


  return (
    <>
    <div className={s.uploadAvatar}>
      <Avatar path={tempAva.src}/>
      <ButtonTransparent title={'Add a Profile Photo'} width={'100%'} disabled={false}/>
    </div>
      <AddAvatarModalWindow/>
    </>
  );
};

export default UploadAvatar;