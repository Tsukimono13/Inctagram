import React from "react";
import { useUserQuery } from "@/services/authApi/authApi";
import s from "./profilePage.module.scss";
import Link from "next/link";
import {CreatePost} from "@/components/post/createPost/CreatePost";
import {useFile} from "@/hooks/fileContext/FileContext";

const ProfilePage = () => {

  const { data: user, isSuccess } = useUserQuery();

  const [fileState,setFileState] = useFile()

  const showPopUp = fileState.showPopUpForPost;


  return (
    <div>
      {showPopUp && <CreatePost/>}
      <div className={s.container}>
        <div>
          <img src={""} className={s.profileImg} />
        </div>
        <div className={s.profileInfoBox}>
          <div className={s.userName}>
            {isSuccess ? user.userName : "User"}
          </div>
          <button className={s.profileSettingsButton}><Link href={'/profile-settings'}>Profile Settings</Link></button>
          <div className={s.subscriptions}>
            <p><strong>2 218</strong><br />Subscriptions</p>
            <p><strong>2 358</strong><br />Subscribers</p>
            <p><strong>2 764</strong><br />Publications</p>
          </div>
          <p className={s.status}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
      <div className={s.contentWrapper}>
        <img src={""} className={s.contentImg} />
        <img src={""} className={s.contentImg} />
        <img src={""} className={s.contentImg} />
        <img src={""} className={s.contentImg} />
        <img src={""} className={s.contentImg} />
        <img src={""} className={s.contentImg} />
      </div>
    </div>
  );
};

export default ProfilePage;