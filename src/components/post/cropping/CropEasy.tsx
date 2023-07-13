import s from "./cropEasy.module.css";
import {FC, useEffect, useState} from "react";
import Cropper, {Area} from "react-easy-crop";
import {getImageDimensions} from "@/assets/utils/getImage/getImageDimension";
import getCroppedImg from "@/assets/utils/cropImage/cropImage";
import {HeaderForPost} from "@/components/post/headerForPost/HeaderForPost";
import {useFile} from "@/hooks/fileContext/FileContext";
import {FlagType} from "@/components/post/createPost/CreatePost";
import {CropPhoto} from "@/components/post/cropping/CropPhoto";

type PropsType = {
    setFlag: (flag: FlagType) => void
}

export type SizeType = {
    width: number
    height: number
}

type CropType = {
    x: number
    y: number
}

export const CropEasy: FC<PropsType> = ({ setFlag }) => {

    const [fileState,setFileState] = useFile()
    const photoURL = fileState.urlOriginalFile

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<(SizeType & CropType) | null>(null)
    const [currentSize, setCurrentSize] = useState<SizeType>({ height: 1, width: 1 })
    const [originalSize, setOriginalSize] = useState<SizeType>({} as SizeType)
    const [crop, setCrop] = useState<CropType>({ x: 0, y: 0 })
    const [editPhoto, setEditPhoto] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCropChange = (crop: CropType) => {
        setCrop(crop)
    }

    const onZoomChange = (zoom: number) => {
        setZoom(zoom)
    }

    const editPhotoHandler = () => {
        setEditPhoto(!editPhoto)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        if (openMenu) {
            setOpenMenu(false)
        }
    }

    const openModalHandler = () => {
        setOpenMenu(!openMenu)
        if (editPhoto) {
            setEditPhoto(false)
        }
    }

    const cropImage = async () => {
        const res = await getCroppedImg(photoURL, croppedAreaPixels)
        if (res) {
            setFileState(state => ({...state,urlCropFile:res.url}))
            setFileState(state => ({...state,cropFile:res.file as File}))
            setFlag('filter')
        }
    }

    const originalPic = () => {
        setZoom(1)
        setCurrentSize(originalSize)
    }

    useEffect(() => {
        getImageDimensions(fileState.originalFile as File).then(res => {
            setOriginalSize({ width: res.width, height: res.height })
            setCurrentSize({ width: res.width, height: res.height })
        })
    }, [fileState.originalFile])


    return (
        <div>
            <HeaderForPost
                callbackForBack={()=> setFlag('load')}
                callbackForNextStep={cropImage}
                title={'Cropping'}
                titleForNextStep={'Next'}
                />
            <div className={s.wrapper}>
                <Cropper
                    image={photoURL}
                    showGrid={false}
                    crop={crop}
                    zoom={zoom}
                    aspect={currentSize.width / currentSize.height}
                    onZoomChange={onZoomChange}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                />
            </div>
            <CropPhoto
                editPhoto={editPhoto}
                openMenu={openMenu}
                zoom={zoom}
                setZoom={setZoom}
                editPhotoHandler={editPhotoHandler}
                openModalHandler={openModalHandler}
                originalPic={originalPic}
                setCurrentSize={setCurrentSize}
            />
        </div>
    )
}