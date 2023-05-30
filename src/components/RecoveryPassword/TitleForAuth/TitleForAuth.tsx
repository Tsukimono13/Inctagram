import React, {FC} from 'react';
import variables from '../../../styles/variables.module.scss';

type Props = {
  marginBottom: string
  text: string
}
const TitleForAuth: FC<Props> = ({marginBottom, text}) => {
  const style = {
    textAlign:'center' as const,
    marginBottom: marginBottom,
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '36px',
    color: `${variables.whiteColor}`,
  }

  return (
    <h3 style={style}>
      {text}
    </h3>
  );
};

export default TitleForAuth;