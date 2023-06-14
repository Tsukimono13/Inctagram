import React, { FC, PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{}>;

export const ContainerForConfirm: FC<ContainerProps> = ({ children }) => {
    return (
      <div style={style}>
          {children}
      </div>
    );
}

const style: React.CSSProperties = {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '35px',
};
