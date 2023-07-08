import React, {PropsWithChildren} from 'react';
import {NextPage} from "next";
import style from './PopUp.module.css'

type PropsType = {
    onClose?: () => void
}


export const PopUp:NextPage<PropsType & PropsWithChildren> = ({children,onClose}) => {
    return (
        <div className={style.modal} onClick={onClose}>
            <div className={style.content} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
