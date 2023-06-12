import s from './AddAvatarModalWindow.module.scss'
import TitleForAuth from "@/components/Auth/RecoveryPassword/TitleForAuth/TitleForAuth";
import CloseIcon from "@mui/icons-material/Close";
import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/router";
import defaultAva from "@/assets/img/icons/picture.png";
import Image from "next/image";
import ButtonBlue from "@/components/Buttons/ButtonBlue/ButtonBlue";
import Editor from "@/components/Profile/UploadAvatar/Editor/Editor";

const AddAvatarModalWindow = () => {
  const [preview, setPreview] = useState<string>('')

  const [errorImg, setErrorImg] = useState("")

  const router = useRouter()
  const onClickHandler = () => {
    return router.push('/profile-settings')
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 1500000) {
        setErrorImg("")
        setPreview(URL.createObjectURL(file))
      } else {
        setErrorImg("Max size of image 1500kb.")
      }
    }
  }

  return (
    <div className={s.modalWrapper}>
      <div className={s.modal}>
        <div className={s.title}>
          <TitleForAuth marginBottom={'0px'} text={'Add a Profile Photo'}/>
          <CloseIcon onClick={onClickHandler} style={{cursor: 'pointer'}}/>
        </div>
        {!preview
          ? (
            <div className={s.selectPhoto}>
              <div className={s.selectPhoto__block}>
                <div className={s.selectPhoto__icon}>
                  <Image src={defaultAva} alt="Avatar" width={36} height={36}/>
                </div>
                <div className={s.error}>{errorImg}</div>
                <input id={'file'} type="file" accept="image/png, image/jpeg" onChange={uploadHandler}
                       style={{display: "none"}}/>
                <ButtonBlue width={'100%'} disabled={false}>
                  <label style={{cursor: 'pointer'}} htmlFor={'file'}>Select from Computer</label>
                </ButtonBlue>
              </div>
            </div>)
          : (
            <>
            <Editor preview={preview}/>
            </>
          )
        }
      </div>
    </div>
  );
};

export default AddAvatarModalWindow;