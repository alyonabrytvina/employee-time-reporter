import React, { useContext, useState } from 'react';
import './Search.scss';
import searchIcon from '../../assets/svgs/search.svg';
import { useDataContext } from '../../context/gridContext';

import { ThemeContext } from '../../context/themeContext';

export function Search() {
  const { onClickSearch } = useDataContext();
  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((e.target.value).toString().toLowerCase().trim());

    if (e.target.value.length === 0) {
      onClickSearch('');
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClickSearch(searchValue);
    }
  };

  const theme = useContext(ThemeContext);

  return (
    <div
      className="search-wrapper"
    >
      <label htmlFor="search">
        <input
          type="search"
          className="search"
          onKeyDown={(e) => onKeyDown(e)}
          onChange={onChange}
          style={{
            background: theme.backgroundInput,
            color: theme.mainColor,
            border: theme.border,
          }}
        />
      </label>
      <div
        onClick={() => onClickSearch(searchValue)}
      >
        <img
          src={searchIcon}
          alt="searchIcon"
          className="search-icon"
          style={{
            filter: theme.arrowColor,
          }}
        />
      </div>
    </div>
  );
}
