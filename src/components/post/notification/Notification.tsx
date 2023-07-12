import {useFile} from "@/hooks/fileContext/FileContext";
import React from "react";
import style from "@/components/post/notification/notification.module.css";
import Image from "next/image";
import closeIcon from "../../../../public/icons/close.png";

export const Notification = () => {


    const [fileState,setFileState] = useFile()

    const handlerForCloseAndNo = (event: React.MouseEvent) => {
        event.stopPropagation();
        setFileState(state => ({...state,showNotificationForPost:false}))
    }

    const handlerForYes = (event: React.MouseEvent) => {
        event.stopPropagation();
        setFileState(state => ({
            ...state,
            showNotificationForPost:false,
            showPopUpForPost:false
        }))
    }

    return(
        <div className={style.modalForNotification}>
            <div className={style.container}>
                <div className={style.containerForTitle}>
                    <h2>Close</h2>
                    <Image src={closeIcon} alt={'closeIcon'} onClick={handlerForCloseAndNo} style={{cursor:'pointer'}}/>
                </div>
                <p className={style.description}>Do you really want to close the creation of a
                    publication?<br/>
                    If you close everything will be deleted</p>
                <div className={style.containerForBtn}>
                    <button onClick={handlerForYes} className={style.btn}>Yes</button>
                    <button onClick={handlerForCloseAndNo}  className={style.btn}>No</button>
                </div>
            </div>
        </div>
    )
}
