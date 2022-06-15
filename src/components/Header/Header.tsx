import React from 'react';
import mainLogo from '../../assets/svgs/mainLogo.svg';
import './Header.scss';

export const Header:React.FC = () => (
  <header>
    <div>
      <img src={mainLogo} alt="main logo" />
    </div>
  </header>
);
