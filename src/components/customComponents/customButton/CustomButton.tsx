import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    callback: () => void
    color?:string
    textColor?:string
    width?:string
    isDisabled?:boolean
}


const CustomButton: React.FC<ButtonProps> = ({ children ,callback,isDisabled,color,textColor,width}) => {

    const styles = {
        padding: '10px' + '20px',
        fontFamily: 'inter',
        borderRadius: '4px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: '24px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: color ? color : '#397DF6',
        height: '30px',
        width: width ? width : '180px',
        color: textColor ? textColor : 'white',
    }


    return <button style={styles} onClick={callback} disabled={isDisabled}>{children}</button>;
};

export default CustomButton;