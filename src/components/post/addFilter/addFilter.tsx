import React, { PropsWithChildren, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import style from './addFilter.module.css'
import {filtersSet} from "@/components/post/addFilter/filterSet";
import { setImageFilter } from '@/assets/utils/setImageFilter/setImageFilter'
import {HeaderForPost} from "@/components/post/headerForPost/HeaderForPost";
import {useFile} from "@/hooks/fileContext/FileContext";
import {FlagType} from "@/components/post/createPost/CreatePost";


type PropsType = {
    setFlag: (flag: FlagType) => void
}


export const AddFilters: NextPage<PropsType & PropsWithChildren> = ({ setFlag }) => {

    const [fileState,setFileState] = useFile()

    const urlCroppedPics = fileState.urlCropFile

    const [filter, setFilter] = useState('none')

    const handleImageSubmit = async () => {
        const res = await setImageFilter(fileState.cropFile, filter)
        if (res) {
            setFileState(state => ({...state,filterFile:res.file as File}))
            setFileState(state => ({...state,urlFilterFile:res.url}))
            setFlag('publish')
        }
    }

    return (
        <div className={style.container}>

            <HeaderForPost callbackForBack={()=>setFlag('crop')}
                           callbackForNextStep={handleImageSubmit}
                           title={'Filter'}
                           titleForNextStep={'Next'}/>

            <div className={style.filtersContainer}>
                <Image
                    src={urlCroppedPics}
                    alt={'picture'}
                    width={486}
                    height={500}
                    style={{ filter: filter, objectFit: 'cover' }}
                />
                <div className={style.filters}>
                    {filtersSet.map(el => (
                        <div key={el.id} className={style.filter} onClick={() => setFilter(el.filter)}>
                            <Image
                                src={urlCroppedPics}
                                alt={el.filterTitle}
                                style={{ filter: el.filter }}
                                width={108}
                                height={108}
                            />
                            <div style={{ marginTop: '6px' }}>{el.filterTitle}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
