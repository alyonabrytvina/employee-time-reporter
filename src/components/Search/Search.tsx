import React, { useState } from 'react';
import './Search.scss';
import searchIcon from '../../assets/svgs/search icon.svg';

interface Props{
  onClickSearch: (value: string) => void
}

export function Search({ onClickSearch }: Props) {
  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((e.target.value).toString());

    if (e.target.value.length === 0) {
      onClickSearch('');
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClickSearch(searchValue);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        className="search"
        onKeyDown={(e) => onKeyDown(e)}
        onChange={onChange}
      />
      <div
        onClick={() => onClickSearch(searchValue)}
      >
        <img src={searchIcon} alt="searchIcon" className="search__icon" />
      </div>
    </div>
  );
}
