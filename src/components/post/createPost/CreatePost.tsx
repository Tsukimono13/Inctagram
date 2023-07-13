import React, {useState} from 'react';
import s from "@/components/profile/profilePage.module.scss";
import {AddPhoto} from "@/components/post/addPhoto/AddPhoto";
import {AddFilters} from "@/components/post/addFilter/addFilter";
import {Publish} from "@/components/post/publish/Publish";
import {PopUp} from "@/components/popup/PopUp";
import {CropEasy} from "@/components/post/cropping/CropEasy";





export type FlagType = 'load' | 'crop' | 'filter' | 'publish'


export const CreatePost = () => {

    const [flag,setFlag] = useState<FlagType>('load')

    const flagChangeHandler = (flag: FlagType) => {
        setFlag(flag)
    }


    return (
        <>
            <PopUp>
                <div className={s.containerForPopUp}>
                    {flag === 'load' ? <AddPhoto setFlag={flagChangeHandler}/>
                        : flag === 'crop' ? <CropEasy setFlag={flagChangeHandler}/>
                            : flag === 'filter' ? <AddFilters setFlag={flagChangeHandler}/>
                                : flag === 'publish' && <Publish setFlag={flagChangeHandler}/>}
                </div>
            </PopUp>
        </>
    );
};

