import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import './SelectStatus.scss';
import arrow from '../../../assets/svgs/arrow.svg';
import dropdown from '../../../assets/svgs/dropdown.svg';
import { useDataContext } from '../../../context/gridContext';
import { ThemeContext } from '../../../context/themeContext';
import { useDropdown } from '../../../hooks/useDropdown';

export function SelectStatus() {
  const { status, onChangeSelect } = useDataContext();
  const [statusValue, setStatusValue] = useState<string>('All status');

  const {
    ref,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useDropdown();

  const onClickOpen = () => setIsDropdownOpen(!isDropdownOpen);
  const theme = useContext(ThemeContext);

  const onClickOption = (option: string) => {
    setStatusValue(option);
    onChangeSelect(option);
  };

  return (
    <div
      className="select-wrapper"
      ref={ref}
    >
      <div
        className="select"
        style={{
          background: theme.backgroundInput,
          color: theme.mainColor,
          border: isDropdownOpen ? '1px solid #8F7FFF' : theme.border,
        }}
        onClick={onClickOpen}
      >
        {statusValue}
      </div>
      <div
        className="select__arrow"
        onClick={onClickOpen}
      >
        <img
          src={isDropdownOpen ? dropdown : arrow}
          alt="arrow"
          style={{
            filter: theme.arrowColor,
          }}
        />
      </div>
      {isDropdownOpen ? (
        <div id="tooltip-select">
          <div className="tooltip-select-arrow" />
          <div className="tooltip-select-label">
            {status.map((option) => (
              <div
                key={Math.random()}
                className="tooltip-select-label__item"
                onClick={() => onClickOption(option)}
                style={{
                  background: option === statusValue ? 'rgba(124, 128, 134, 0.15)' : '',
                }}
              >
                {option}
                <br />
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </div>
  );
}
