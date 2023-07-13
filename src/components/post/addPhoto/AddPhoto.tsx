import React, {ChangeEvent, FC} from 'react';
import style from './addPhoto.module.css'
import Image from "next/image";
import closeIcon from '../../../../public/icons/close.png'
import defaultImage from '../../../../public/icons/defaultImage.svg'
import {useFile} from "@/hooks/fileContext/FileContext";
import {FlagType} from "@/components/post/createPost/CreatePost";



type AddPhotoType = {
    setFlag:(flag:FlagType) => void
}

export const AddPhoto:FC<AddPhotoType> = ({setFlag}) => {

    const [_,setFileState] = useFile()

    const handlerForClose = () => {
        setFileState(state => ({...state,showPopUpForPost:false}))
    };

    const onChangeHandlerForFiles = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files?.[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFileState(state => ({...state,urlOriginalFile:reader.result as string}))
                };
                reader.readAsDataURL(file);
            }
            setFileState(state => ({...state,originalFile:file as File}))
            setFlag('crop')
            console.log(file)
        }
    };

    return (
        <>
            <div className={style.containerForTitle}>
                <h2>Add Photo</h2>
                <Image src={closeIcon} alt={'closeIcon'} onClick={handlerForClose} className={style.img} />
            </div>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div className={style.image}>
                    <Image src={defaultImage} alt={'defaultPostImage'} width='50' height='50' />
                    </div>
                    <div>
                        <div className={style.btn}>
                        <label htmlFor="image_uploads">Select From Computer</label>
                        <input
                            type="file"
                            id="image_uploads"
                            name="file"
                            onChange={onChangeHandlerForFiles}
                            style={{ display: 'none' }}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

