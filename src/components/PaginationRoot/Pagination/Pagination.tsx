import React, { useContext, useState } from 'react';
import './Pagination.scss';
import { useDataContext } from '../../../context/gridContext';
import { ThemeContext } from '../../../context/themeContext';

import { PaginationSwitcher } from '../PaginationSwitcher/PaginationSwitcher';
import { PaginationRange } from '../PaginationRowsPerPage/PaginationRowsPerPage';
import { PaginationDropdown } from '../PaginationDropdown/PaginationSelect';
import { PaginationSelectI } from '../../App/App';

enum Enums {
    initialRowsValue = 1,
}

interface Props {
    currentPage: number
    onPageChange: (page: number) => void
    onRowsPerPageChange: (option: number) => void
    rowsPerPage: number
    totalPageCount: number
    paginationSelect: PaginationSelectI[]
}

export function Pagination({
  onPageChange,
  currentPage,
  onRowsPerPageChange,
  rowsPerPage,
  paginationSelect,
  totalPageCount,
}: Props) {
  const { data } = useDataContext();
  const [quantityRows, setQuantityRows] = useState<number>(rowsPerPage);
  const [startLimitValue, setStartLimitValue] = useState<number>(Enums.initialRowsValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickLastPage = () => {
    const remainder = data.length % rowsPerPage;
    onPageChange(totalPageCount);
    setStartLimitValue(data.length - remainder + 1);
    setQuantityRows(data.length);
  };

  const onClickNext = () => {
    onPageChange(currentPage + 1);
    setStartLimitValue(startLimitValue + rowsPerPage);

    if (quantityRows > data.length) {
      setQuantityRows(data.length - 1);
      return;
    }
    setQuantityRows(quantityRows + rowsPerPage);
  };

  const onClickPrev = () => {
    onPageChange(currentPage - 1);
    setQuantityRows(startLimitValue - 1);
    setStartLimitValue(startLimitValue - rowsPerPage);
  };

  const onChangeOption = (option: number) => {
    onRowsPerPageChange(option);
    setQuantityRows(option);
    setStartLimitValue(Enums.initialRowsValue);
    onPageChange(1);
    setIsOpen(!isOpen);
  };

  const finishLimitValue = quantityRows >= data.length ? data.length : quantityRows;
  const theme = useContext(ThemeContext);

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
      <PaginationDropdown
        rowsPerPage={rowsPerPage}
        onChangeOption={onChangeOption}
        quantityRows={quantityRows}
        paginationSelect={paginationSelect}
      />
      <PaginationRange
        startLimitValue={startLimitValue}
        finishLimitValue={finishLimitValue}
      />
      <PaginationSwitcher
        onClickPrev={onClickPrev}
        startRowsValue={startLimitValue}
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onClickLastPage={onClickLastPage}
        onClickNext={onClickNext}
        quantityRows={quantityRows}
      />
    </div>
  );
}
