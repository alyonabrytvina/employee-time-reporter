import React from 'react';
import './Search.scss';
import searchIcon from '../../assets/svgs/search icon.svg';

export function Search() {
  return (
    <div className="search-wrapper">
      <input className="search" />
      <img src={searchIcon} alt="searchIcon" className="search__icon" />
    </div>
  );
}
