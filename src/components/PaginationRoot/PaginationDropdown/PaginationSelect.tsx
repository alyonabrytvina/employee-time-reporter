import React, { useContext } from 'react';
import dropdown from '../../../assets/svgs/dropdown.svg';
import arrow from '../../../assets/svgs/arrow.svg';
import { ThemeContext } from '../../../context/themeContext';
import { PaginationSelectI } from '../../App/App';
import { useDropdown } from '../../../hooks/useDropdown';

interface Props {
    onChangeOption: (option: number) => void
    rowsPerPage: number
    quantityRows: number
    paginationSelect: PaginationSelectI[]
}

export const PaginationDropdown = ({
  rowsPerPage, onChangeOption, quantityRows, paginationSelect,
}: Props) => {
  const theme = useContext(ThemeContext);
  const {
    ref,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useDropdown();
  const onClickDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div
      className="pagination-select"
      ref={ref}
      style={{
        background: theme.backgroundInput,
        color: theme.mainColor,
        border: isDropdownOpen ? '1px solid #8F7FFF' : theme.border,
      }}
    >
      <div
        className="pagination-select__quantity"
        onClick={onClickDropdown}
      >
        <span>{rowsPerPage}</span>
        <img
          src={isDropdownOpen ? dropdown : arrow}
          alt="arrow"
          className="pagination-select__arrow-icon"
          style={{
            filter: isDropdownOpen ? theme.arrowColor : theme.arrowDisabledColor,
          }}
        />
      </div>
      {isDropdownOpen && (
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
  );
};
