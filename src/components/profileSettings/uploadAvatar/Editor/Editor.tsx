import React, {useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import s from "./Editor.module.scss";
import ButtonBlue from "@/components/Buttons/ButtonBlue/ButtonBlue";
import {ResponseUploadAvatar, useUploadAvatarMutation} from "@/services/profileApi/profileApi";
import {convertCanvasToBinaryFile} from "@/common/utils/convert-canvas-to-binaryFile";

type Props = {
  preview: string
  showModal:(value:boolean)=>void
}
const Editor = ({preview,showModal}: Props) => {
  const [uploadAvatar, {isLoading, isError}] = useUploadAvatarMutation()
  const editor = useRef<null | AvatarEditor>(null)

  const saveAvatar = async () => {
    if (editor?.current) {
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editor.current.getImageScaledToCanvas()
      const formData = convertCanvasToBinaryFile(canvasScaled)

      try {
        const res = await uploadAvatar(formData) as {data: ResponseUploadAvatar}
        showModal(false)
      } catch (e) {
        console.log(e)
      }

    }
  }
  return (
    <>
      <div className={s.avatar}>
        <AvatarEditor
          ref={editor}
          image={preview}
          width={332}
          height={332}
          borderRadius={158}
          color={[0, 0, 0, 0.8]} // RGBA
          scale={1.2}
          rotate={0}
        />
      </div>
      <div className={s.button_container}>
        <ButtonBlue title={'Save'} width={'86px'} disabled={isLoading} callback={saveAvatar}/>
      </div>

    </>
  )

}

export default Editor