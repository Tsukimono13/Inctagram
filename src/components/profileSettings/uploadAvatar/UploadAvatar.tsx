import React, {useState} from 'react';
import tempAva from '../../../assets/img/icons/face2.jpg'
import s from './UploadAvatar.module.scss'
import ButtonTransparent from "@/components/auth/recoveryPassword/buttons/ButtonTransparent/ButtonTransparent";
import AddAvatarModalWindow from "@/components/profileSettings/uploadAvatar/AddAvatarModalWindow/AddAvatarModalWindow";
import Avatar from "@/components/profileSettings/uploadAvatar/Avatar/Avatar";

const UploadAvatar = () => {

  const [showAddAvatarModalWindow, setShowAddAvatarModalWindow] = useState(false)

  const showModal = (value:boolean)=>{
    setShowAddAvatarModalWindow(value)
  }
  return (
    <>
      <div className={s.uploadAvatar}>
        <Avatar path={tempAva.src}/>
        <ButtonTransparent title={'Add a Profile Photo'} width={'100%'} disabled={false} callback={()=>showModal(true)}/>
      </div>
      {showAddAvatarModalWindow && <AddAvatarModalWindow showModal={showModal}/>}
    </>
  );
};

export default UploadAvatar;