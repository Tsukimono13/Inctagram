import React, {FC} from 'react';


type Props = {
  text: string
  color: string
  marginBottom: string
  fontSize: string

}
const TextForAuth: FC<Props> = ({marginBottom, color, fontSize, text,}) => {
  const style = {
    fontWeight: '400',
    lineHeight: '24px',
    color: color,
    marginBottom: marginBottom,
    fontSize: fontSize,
  }

  return (
    <p style={style}>
      {text}
    </p>
  );
};

export default TextForAuth;