import React, {useRef} from 'react'
import AvatarEditor  from 'react-avatar-editor'
import s from "./Editor.module.scss";
import ButtonBlue from "@/components/Buttons/ButtonBlue/ButtonBlue";
import {useRouter} from "next/router";

type Props = {
  preview: string
}
const Editor = ({preview}: Props) => {

  const editor = useRef<null | AvatarEditor>(null)

  const saveAvatar = () => {
    if (editor?.current) {
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)

      const canvasScaled = editor.current.getImageScaledToCanvas()
      const base64Canvas = canvasScaled.toDataURL("image/jpeg").split(';base64,')[1];
      console.log(base64Canvas)
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
        <ButtonBlue title={'Save'} width={'86px'} disabled={false} callback={saveAvatar}/>
      </div>

    </>
  )

}

export default Editor