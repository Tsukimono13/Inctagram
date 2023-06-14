import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { Header } from "../Header/Header";
import s from './layout.module.css';

type LayoutWithBarProps = {
  children: ReactNode;
};

export const LayoutWithBar = ({ children }: PropsWithChildren<LayoutWithBarProps>): ReactElement => {
  return (
   <>
     <Header />
     <div>{children}</div>
   </>
  );
};

export const getLayoutWithBar = (page: ReactElement): ReactElement => <LayoutWithBar>{page}</LayoutWithBar>;
export type GetLayoutWithBarType = typeof getLayoutWithBar;


