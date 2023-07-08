import React, {ChangeEvent, FC, useState} from 'react';
import style from './publish.module.css'
import Image from "next/image";
import {HeaderForPost} from "@/components/post/headerForPost/HeaderForPost";
import {FlagType} from "@/components/profile/ProfilePage";
import defaultImage from '../../../../public/icons/defaultImage.svg'
import {useUserQuery} from "@/services/authApi/authApi";
import {useAddPostMutation, useAddPostPhotoMutation} from "@/services/postsApi/postApi";
import {useFile} from "@/hooks/fileContext/FileContext";


type PropsType = {
    setFlag:(flag: FlagType) => void
}


export const Publish:FC<PropsType> = ({setFlag}) => {

    const [fileState,setFileState] = useFile()

    const [description,setDescription] = useState<string>('')

    const { data: user } = useUserQuery();

    const [addPostPhoto] = useAddPostPhotoMutation()

    const [addPost] = useAddPostMutation()

    const publishImgUrl = fileState.urlFilterFile


    const handlerForPublish = async () => {
        const formData = new FormData()
        formData.append('file', fileState.filterFile)

        const res = await addPostPhoto(formData).unwrap()
        console.log(res.images)
        await addPost({ description, childrenMetadata: [{ uploadId: res.images[0].uploadId }] })
        await setFileState(state => ({...state,showPopUpForPost:false}))
        setFlag('load')
    }

    const handlerForTextArea = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    return (
        <div className={style.container}>
            <HeaderForPost callbackForBack={() => setFlag('filter')}
                           callbackForNextStep={handlerForPublish}
                           title={'Publication'}
                           titleForNextStep={'Publish'}/>
            <div className={style.publishContainer}>
                <div>
                    <Image src={publishImgUrl} alt={'publishImgUrl'} width={486}
                           height={500}/>
                </div>
                <div className={style.description}>
                    <div className={style.userInfo}>
                        <Image
                            src={defaultImage || user.avatar}
                            alt={'avatar'}
                            width={30}
                            height={30}
                            style={{borderRadius:'50'+'%'}}
                        />
                        <h2>{user?.userName || 'User'}</h2>
                    </div>
                    <div className={style.containerForTextArea}>
                        <h3 className={style.titleForTextArea}>Add publication descriptions</h3>
                        <textarea placeholder={'Text-Area'} className={style.textArea}
                        maxLength={500} onChange={handlerForTextArea}/>
                        {<span className={style.limit}>{description.length}/500</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

