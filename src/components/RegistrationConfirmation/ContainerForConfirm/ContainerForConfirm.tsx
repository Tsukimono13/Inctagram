import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}

export const ContainerForConfirm: FC<Props> = ({children}) => {
    const style = {
        height: '80' + 'vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '35px',
    }
    return (
        <div style={style}>
            {children}
        </div>
    );
}
