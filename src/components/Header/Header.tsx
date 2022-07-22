import React, { useContext } from 'react';
import darkMode from '../../assets/svgs/moon.svg';
import lightMode from '../../assets/svgs/sun.svg';
import './Header.scss';
import { ThemeContext } from '../../context/themeContext';

interface HeaderProps{
  changeMode: () => void
  isModeDark: boolean
}

export function Header({ changeMode, isModeDark }: HeaderProps) {
  const theme = useContext(ThemeContext);

  return (
    <header style={{
      background: theme.backgroundHeader,
      border: theme.border,
      color: theme.mainColor,
    }}
    >
      <div onClick={changeMode}>
        <img
          className="mode-icon"
          src={isModeDark ? lightMode : darkMode}
          alt="mode icon"
        />
      </div>
    </header>
  );
}
