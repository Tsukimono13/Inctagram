import {FC, PropsWithChildren} from "react";

export const ContainerForConfirm: FC<PropsWithChildren> = ({children}) => {

    return (
        <div style={style}>
            {children}
        </div>
    );
}

const style = {
    height: '80' + 'vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '35px',
}
