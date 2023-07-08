import React, {FC} from 'react';
import style from "src/components/post/headerForPost/headerForPost.module.css";
import Image from "next/image";
import arrowBack from "../../../../public/icons/arrowBack.svg";



type PropsType = {
    callbackForBack:() => void
    callbackForNextStep:() => void
    title:string
    titleForNextStep:string
}

export const HeaderForPost:FC<PropsType> = ({callbackForBack,callbackForNextStep,titleForNextStep,title}) => {
  return(
    <div>
        <div className={style.header}>
            <Image src={arrowBack} alt={'arrowBack'} className={style.arrow} onClick={callbackForBack}/>
            <h2>{title}</h2>
            <button onClick={callbackForNextStep} className={style.btn}>
                {titleForNextStep}
            </button>
        </div>
    </div>
  )}
