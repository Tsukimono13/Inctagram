import React from "react";
import s from "./sidebar.module.scss";

const menu = [{img: '', title: 'Home'},
  {img: '', title: 'Create'},
  {img: '', title: 'My Profile'},
  {img: '', title: 'Messenger'},
  {img: '', title: 'Search'},
  {img: '', title: 'Favorites'},
  {img: '', title: 'Log Out'}
  ]

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      {menu.map((m, index) =>
        <div key={index}>
          <img src={m.img}/>
          <h2>{m.title}</h2>
        </div>)
      }
    </div>
);
};

export default Sidebar;