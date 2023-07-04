import React, {useState} from 'react';
import Avatar from "@/components/Profile/UploadAvatar/Avatar/Avatar";
import ButtonTransparent from "@/components/Buttons/ButtonTransparent/ButtonTransparent";
import tempAva from '../../../assets/img/icons/face2.jpg'
import s from './UploadAvatar.module.scss'
import AddAvatarModalWindow from "@/components/Profile/UploadAvatar/AddAvatarModalWindow/AddAvatarModalWindow";

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