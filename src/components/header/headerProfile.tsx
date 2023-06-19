import React from "react";
import s from "src/components/header/header.module.scss";
import Link from "next/link";

const HeaderProfile = () => {
  return (
    <div className={s.headerProfile}>
      <Link href={'/'}><h2 className={s.title}>Inctagram</h2></Link>
    </div>
  );
};

export default HeaderProfile;