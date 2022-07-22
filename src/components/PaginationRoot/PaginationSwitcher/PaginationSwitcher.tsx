import React, { useContext } from 'react';
import arrowPrevActive from '../../../assets/svgs/arrowRightActive.svg';
import arrowNextActive from '../../../assets/svgs/arrowLeftActive.svg';
import '../Pagination/Pagination.scss';
import { ThemeContext } from '../../../context/themeContext';
import { useDataContext } from '../../../context/gridContext';

enum Enums{
    initialRowsValue = 1,
    siblingCount = 1
}

interface Props{
    currentPage: number
    totalPageCount: number
    quantityRows: number
    onClickNext: () => void
    onClickLastPage: () => void
    onClickPrev: () => void
    startRowsValue: number
}

export const PaginationSwitcher = ({
  onClickPrev, startRowsValue, currentPage,
  totalPageCount, onClickLastPage, onClickNext, quantityRows,
}: Props) => {
  const theme = useContext(ThemeContext);
  const { data } = useDataContext();

  const leftSiblingIndex = currentPage === 1 ? null : Math.max(currentPage - Enums.siblingCount);
  const rightSiblingIndex = Math.min(
    currentPage + Enums.siblingCount,
    totalPageCount,
  );

  const isFirstPageIndex = currentPage !== 1;
  const isLastPageIndex = totalPageCount !== currentPage;
  const notLast = currentPage <= totalPageCount - 3;

  return (
    <div
      className="pagination__items-wrapper"
      style={{
        background: theme.backgroundInput,
        color: theme.mainColor,
        border: theme.border,
      }}
    >
      <button
        className="pagination__prev-page"
        onClick={onClickPrev}
        disabled={startRowsValue === Enums.initialRowsValue}
        style={{
          background: theme.backgroundInput,
        }}
      >
        <img
          src={arrowPrevActive}
          alt="prev"
          style={{
            filter: startRowsValue === Enums.initialRowsValue ? theme.arrowDisabledColor : theme.arrowColor,
          }}
        />
      </button>
      <div className="pagination__items">
        {isFirstPageIndex && <span className="pagination__item" onClick={onClickPrev}>{leftSiblingIndex}</span>}
        <span className="pagination__item_selected">{currentPage}</span>
        {isLastPageIndex && <span className="pagination__item" onClick={onClickNext}>{rightSiblingIndex}</span>}
        {notLast && <div>...</div>}
        {rightSiblingIndex !== totalPageCount && <span className="pagination__item" onClick={onClickLastPage}>{totalPageCount}</span>}
      </div>
      <button
        onClick={onClickNext}
        className="pagination__next-page"
        disabled={quantityRows >= data.length}
        style={{
          background: theme.backgroundInput,
        }}
      >
        <img
          src={arrowNextActive}
          alt="next"
          style={{
            filter: currentPage === totalPageCount ? theme.arrowDisabledColor : theme.arrowColor,
          }}
        />
      </button>
    </div>
  );
};
