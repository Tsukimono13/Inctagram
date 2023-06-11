import React from 'react';
import s from './Avatar.module.scss'
import defaultAva from '../../../assets/img/icons/picture.png'
import Image from "next/image";

type Props = {
  path: string | null
}

const Avatar = ({path}: Props) => {

  return (
    <div className={s.avatar}>
      {
        path
          ?<Image className={s.avatarImg} src={path} alt="Avatar" width={192} height={192}/>
          :<Image className={s.defaultAva} src={defaultAva} alt="Avatar" width={36} height={36}/>
      }

    </div>
  );
};

export default Avatar;