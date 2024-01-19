import type { ReactNode } from 'react';

type HeaderProps = { children: ReactNode };

export default function Header({ children }: HeaderProps) {
  return <header className='header'>{children}</header>;
}

export const HeaderTop = ({ children }: HeaderProps) => {
  return <div className='header__top'>{children}</div>;
};
