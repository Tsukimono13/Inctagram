import React, {FC} from 'react';
import s from './ButtonTransparent.module.scss'

type PropsType = {
  title: string
  width: string
  disabled: boolean
  type?: 'submit' | undefined | 'button'
  callback?: () => void
}

const ButtonTransparent: FC<PropsType> = ({title, width, disabled, type, callback}) => {
  const style = {
    width: width
  }
  return (
    <button
      disabled={disabled}
      style={style}
      onClick={callback}
      type={type}
      className={s.button}
    >
      {title}
    </button>
  );
};

export default ButtonTransparent;