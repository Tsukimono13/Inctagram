import React, {FC} from 'react';
import s from "./Link.module.scss";
import Link from "next/link";

type PropsType = {
  title: string
  path: string
}
const CustomLink: FC<PropsType> = ({title, path}) => {

  return (
    <Link
      href={path}
      className={s.link}>{title}
    </Link>)

};

export default CustomLink;