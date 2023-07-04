import React, {FC} from 'react';
import s from './ButtonBlue.module.scss'

type PropsType = {
  children?:React.ReactNode
  title?: string
  width: string
  disabled: boolean
  type?: 'submit' | undefined | 'button'
  callback?: () => void
}

const ButtonBlue: FC<PropsType> = ({title, width, disabled, type, callback,children}) => {
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
      {children}
    </button>
  );
};

export default ButtonBlue;