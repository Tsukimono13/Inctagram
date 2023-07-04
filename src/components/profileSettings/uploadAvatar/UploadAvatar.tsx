'use client'
import React, {useState} from 'react';
import s from './UploadAvatar.module.scss'
import ButtonTransparent from "@/components/auth/recoveryPassword/buttons/ButtonTransparent/ButtonTransparent";
import AddAvatarModalWindow from "@/components/profileSettings/uploadAvatar/AddAvatarModalWindow/AddAvatarModalWindow";
import Avatar from "@/components/profileSettings/uploadAvatar/Avatar/Avatar";
import {useGetProfileQuery} from "@/services/authApi/authApi";

const UploadAvatar = () => {

  const [showAddAvatarModalWindow, setShowAddAvatarModalWindow] = useState(false)

  const {data} = useGetProfileQuery()
  const avatar = data?.avatars[0].url? data?.avatars[0].url:null

  const showModal = (value:boolean)=>{
    setShowAddAvatarModalWindow(value)
  }
  return (
    <>
      <div className={s.uploadAvatar}>
        <Avatar path={avatar}/>
        <ButtonTransparent title={'Add a Profile Photo'} width={'100%'} disabled={false} callback={()=>showModal(true)}/>
      </div>
      {showAddAvatarModalWindow && <AddAvatarModalWindow showModal={showModal}/>}
    </>
  );
};

export default UploadAvatar;