import React, { useContext, useEffect, useState } from 'react';
import './SelectStatus.scss';
import arrow from '../../assets/svgs/arrow.svg';
import dropdown from '../../assets/svgs/dropdown.svg';
import { useDataContext } from '../../context/gridContext';
import { ThemeContext } from '../../context/themeContext';

export function SelectStatus() {
  const { status, onChangeSelect } = useDataContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>('All status');

  const onClickOpen = () => setIsOpen(!isOpen);

  const onClickOption = (option: string) => {
    setStatusValue(option);
    onChangeSelect(option);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [statusValue]);

  const theme = useContext(ThemeContext);
  return (
    <div
      className="select-wrapper"
    >
      <div
        className="select"
        style={{
          background: theme.backgroundInput,
          color: theme.mainColor,
          border: isOpen ? '1px solid #8F7FFF' : theme.border,
        }}
        onClick={onClickOpen}
      >
        {statusValue}
      </div>
      <div
        className="select__arrow"
      >
        <img
          src={isOpen ? dropdown : arrow}
          alt="arrow"
          style={{
            filter: theme.arrowColor,
          }}
        />
      </div>
      {isOpen ? (
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
