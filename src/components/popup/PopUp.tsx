import React, {PropsWithChildren} from 'react';
import {NextPage}from "next";
import style from './PopUp.module.css'
import {useFile} from "@/hooks/fileContext/FileContext";
import {Notification} from "@/components/post/notification/Notification";

export const PopUp:NextPage<PropsWithChildren> = ({children}) => {

    const [fileState,setFileState] = useFile()

    const onClose = () => {
        setFileState(state => ({...state,showNotificationForPost:true}))
    }

    return (
        <div className={style.modal} onClick={onClose}>
            <div className={style.content} onClick={event => event.stopPropagation()}>
                {children}
            </div>
            {
                fileState.showNotificationForPost ? <Notification/> : ''
            }
        </div>
    );
};

