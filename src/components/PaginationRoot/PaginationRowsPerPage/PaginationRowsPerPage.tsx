import React, { useContext } from 'react';
import { useDataContext } from '../../../context/gridContext';
import { ThemeContext } from '../../../context/themeContext';

interface Props{
    startLimitValue: number
    finishLimitValue: number
}

export const PaginationRange = ({ startLimitValue, finishLimitValue }: Props) => {
  const { data } = useDataContext();
  const theme = useContext(ThemeContext);

  return (
    <span
      className="pagination__rows-per-page"
      style={{
        color: theme.mainColor,
      }}
    >
      {startLimitValue}
      {' '}
      -
      {' '}
      {finishLimitValue}
      {' '}
      of
      {' '}
      {data.length}
    </span>
  );
};
