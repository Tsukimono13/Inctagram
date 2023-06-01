import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
    background: string
    border: string
}

export const ContainerForAuth: FC<Props> = ({children, background, border,}) => {
    const style = {
        maxWidth: '378px',
        padding: '24px',
        background: background,
        border: border,
        borderRadius: '2px',
        margin: '72px auto 0 auto'
    }
    return (
        <div style={style}>
            {children}
        </div>
    );
}
