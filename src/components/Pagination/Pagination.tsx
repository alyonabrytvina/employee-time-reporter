import React, { useContext, useState } from 'react';
import arrowNextActive from '../../assets/svgs/arrowLeftActive.svg';
import arrowPrevActive from '../../assets/svgs/arrowRightActive.svg';
import './Pagination.scss';
import { PaginationSelect } from '../App/App';
import dropdown from '../../assets/svgs/dropdown.svg';
import arrow from '../../assets/svgs/arrow.svg';
import { useDataContext } from '../../context/gridContext';
import { ThemeContext } from '../../context/themeContext';

enum Enums{
  initialRowsValue = 1,
  siblingCount = 1
}

interface Props{
  currentPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (option: number) => void
  rowsPerPage: number
  totalPageCount: number
  paginationSelect: PaginationSelect[]
}

export function Pagination({
  onPageChange, currentPage, onRowsPerPageChange, rowsPerPage, paginationSelect, totalPageCount,
}: Props) {
  const { data } = useDataContext();
  const [quantityRows, setQuantityRows] = useState<number>(rowsPerPage);
  const [startRowsValue, setStartRowsValue] = useState<number>(Enums.initialRowsValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lastRowsValue, setLastRowsValue] = useState<number>(0);

  const leftSiblingIndex = currentPage === 1 ? null : Math.max(currentPage - Enums.siblingCount);
  const rightSiblingIndex = Math.min(
    currentPage + Enums.siblingCount,
    totalPageCount,
  );

  const onClickLastPage = () => {
    onPageChange(totalPageCount);
    setStartRowsValue(data.length - rowsPerPage);
    setLastRowsValue(startRowsValue);
    setQuantityRows(data.length);
  };

  const onClickNext = () => {
    onPageChange(currentPage + 1);
    setStartRowsValue(startRowsValue + rowsPerPage);

    if (quantityRows > data.length) {
      setQuantityRows(data.length - 1);
      return;
    }
    setQuantityRows(quantityRows + rowsPerPage);
  };

  const onClickPrev = () => {
    onPageChange(currentPage - 1);
    setQuantityRows(quantityRows - rowsPerPage);
    setStartRowsValue(startRowsValue - rowsPerPage);
  };

  const onChangeOption = (option: number) => {
    onRowsPerPageChange(option);
    setQuantityRows(option);
    setStartRowsValue(Enums.initialRowsValue);
    onPageChange(1);
    setIsOpen(!isOpen);
  };

  const onClickDropdown = () => setIsOpen(!isOpen);
  const isArrowButtonDisabled = quantityRows >= data.length ? data.length : quantityRows;
  const isFirstPageIndex = currentPage !== 1;
  const isLastPageIndex = totalPageCount !== currentPage;
  const notLast = currentPage <= totalPageCount - 3;

  const theme = useContext(ThemeContext);

  console.log(currentPage, totalPageCount);

  return (
    <div
      className="pagination-wrapper pagination"
    >
      <span
        style={{
          color: theme.mainColor,
        }}
      >
        Rows per page
      </span>
      <div
        className="pagination-select"
        style={{
          background: theme.backgroundInput,
          color: theme.mainColor,
          border: isOpen ? '1px solid #8F7FFF' : theme.border,
        }}
      >
        <div
          className="pagination-select__quantity"
          onClick={onClickDropdown}
        >
          <span>{rowsPerPage}</span>
          <img
            src={isOpen ? dropdown : arrow}
            alt="arrow"
            className="pagination-select__arrow-icon"
            style={{
              filter: isOpen ? theme.arrowColor : theme.arrowDisabledColor,
            }}
          />
        </div>
        {isOpen && (
        <div className="pagination-select__tooltip-select">
          <div className="pagination-select__tooltip-select-arrow" />
          <div
            className="pagination-select__tooltip-select-label"
            style={{
              background: theme.backgroundTooltip,
              color: theme.mainColor,
              border: theme.borderTooltip,
            }}
          >
            {paginationSelect.map((select) => (
              <div
                onClick={() => onChangeOption(select.option)}
                className="pagination-select__option"
                key={select.id}
                style={{
                  background: select.option === quantityRows ? 'rgba(124, 128, 134, 0.15)' : '',
                }}
              >
                {select.option}
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
      <span
        className="pagination__rows-per-page"
        style={{
          color: theme.mainColor,
        }}
      >
        {startRowsValue}
        {' '}
        -
        {' '}
        {isArrowButtonDisabled}
        {' '}
        of
        {' '}
        {data.length}
      </span>
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
    </div>
  );
}
