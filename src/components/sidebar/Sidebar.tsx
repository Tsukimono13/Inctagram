import React from "react";
import s from "src/components/sidebar/sidebar.module.scss";
import Image from "next/image";
import home from "public/icons/home.svg"
import add from "public/icons/plus-square.svg"
import person from "public/icons/person.svg"
import message from "public/icons/message-circle.svg"
import search from "public/icons/search.svg"
import bookmark from "public/icons/bookmark.svg"
import logout from "public/icons/log-out.svg"
import Link from "next/link";

type MenuType = {
  icon: string,
  title: string,
  alt: string,
  href: string
}

const menu: MenuType[] = [
  {icon: home, title: 'Home', alt: 'Home', href: ''},
  {icon: add, title: 'Create', alt: 'Create', href: ''},
  {icon: person, title: 'My Profile', alt: 'My Profile', href: ''},
  {icon: message, title: 'Messenger', alt: 'Messenger', href: ''},
  {icon: search, title: 'Search', alt: 'Search', href: ''},
  {icon: bookmark, title: 'Favorites', alt: 'Favorites', href: ''},
  {icon: logout, title: 'Log Out', alt: 'Log Out', href: ''}
  ]

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <ul className={s.wrapper}>
        {menu.map((m, index) =>
          <li key={index} className={s.iconContainer}>
            <Image src={m.icon} alt={m.alt}/>
            <Link href={m.href}><h2 className={s.menuTitle}>{m.title}</h2></Link>
          </li>)
        }
      </ul>
    </div>
);
};

export default Sidebar;