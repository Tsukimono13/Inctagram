import {FC, ReactNode} from "react";
import s from './ContainerForAuth.module.scss'

type Props = {
  children: ReactNode
}
export const ContainerForAuth: FC<Props> = ({children}) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
}
