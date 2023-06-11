import React from 'react';
import Avatar from "@/components/Profile/Avatar/Avatar";
import ButtonTransparent from "@/components/Buttons/ButtonTransparent/ButtonTransparent";
import tempAva from '../../../assets/img/icons/face2.jpg'
import s from './UploadAvatar.module.scss'

const UploadAvatar = () => {


  return (
    <div className={s.uploadAvatar}>
      <Avatar path={tempAva.src}/>
      <ButtonTransparent title={'Add a Profile Photo'} width={'100%'} disabled={false}/>
    </div>
  );
};

export default UploadAvatar;