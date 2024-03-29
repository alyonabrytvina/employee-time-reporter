import React, { useContext, useEffect, useState } from 'react';
import arrow from '../../../assets/svgs/arrow.svg';
import dropdown from '../../../assets/svgs/dropdown.svg';
import './SelectDevelopers.scss';

import { useDataContext } from '../../../context/gridContext';
import { ThemeContext } from '../../../context/themeContext';
import { useDropdown } from '../../../hooks/useDropdown';

export interface Developers{
  design: string[]
  frontend: string[]
  backend: string[]
  pms: string[]
}

export function SelectDevelopers() {
  const {
    onChangeSelectDev, developers, selectCategories,
    categoriesValues, categoriesLabels,
  } = useDataContext();

  const theme = useContext(ThemeContext);
  const [categories, setCategories] = useState<string[]>([]);
  const [dev, setDev] = useState<Record<string, string[]>>({});

  const [initialCategoriesLength, setInitialCategoriesLength] = useState<number>(0);
  const [optionsNames, setOptionsNames] = useState<string[]>([]);

  const {
    ref,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useDropdown();

  useEffect(() => {
    setDev(developers);
  }, [developers]);

  useEffect(() => {
    if (optionsNames && optionsNames.length === 0) {
      setOptionsNames(categoriesLabels);
    }
  }, [categoriesLabels, optionsNames]);

  const onClickOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const onClickSubCat = (key: string, item: string) => {
    if (dev[key as keyof Developers]?.includes(item)) {
      setDev((prevState) => ({
        ...prevState,
        [key]: prevState[key as keyof Developers].filter((state: string) => state !== item),
      }));
    } else {
      setDev((prevState) => ({
        ...prevState,
        [key]: [...dev[key as keyof Developers], item],
      }));
    }
  };

  useEffect(() => {
    const developers = Object.values(dev)?.reduce((total, currentValue) => (total).concat(currentValue), []);
    onChangeSelectDev(developers);
  }, [dev]);

  useEffect(() => {
    if (categoriesValues) {
      setInitialCategoriesLength(categoriesValues.length);
    }

    if (categories.length === 0) {
      setCategories(categoriesValues);
      setDev(developers);
      setOptionsNames(categoriesLabels);
    }
  }, [categoriesValues, categories]);

  const onClickOption = (key: string) => {
    if (categories.includes(key)) {
      setCategories((prevState) => prevState.filter((state) => state !== key));

      setDev((prevState) => ({
        ...prevState,
        [key]: [],
      }));

      selectCategories.filter((category) => {
        if (category.value === key) {
          return setOptionsNames((prevState) => prevState?.filter((state) => state !== category.label));
        }
      });
    } else {
      setCategories((prevState) => [...prevState, key]);

      setDev((prevState) => ({
        ...prevState,
        [key]: developers[key as keyof Developers],
      }));

      selectCategories.filter((category) => {
        if (category.value === key) {
          return setOptionsNames((prevState) => [...prevState, category.label]);
        }
      });
    }
  };

  return (
    <div
      className="select-dev-wrapper"
      ref={ref}
    >
      <div
        className="select-dev"
        onClick={onClickOpen}
        style={{
          background: theme.backgroundInput,
          color: theme.mainColor,
          border: isDropdownOpen ? '1px solid #8F7FFF' : theme.border,
        }}
      >
        {categories?.length === initialCategoriesLength ? 'All people' : optionsNames && [...optionsNames].join(', ')}
      </div>
      <div className="select-dev__arrow" onClick={onClickOpen}>
        <img
          src={isDropdownOpen ? dropdown : arrow}
          alt="arrow"
          style={{
            filter: theme.arrowColor,
          }}
        />
      </div>
      {isDropdownOpen && (
        <div id="tooltip-select-dev" className="left">
          <div className="tooltip-select-dev-arrow" />
          <div className="tooltip-select-dev-label">
            {Object.entries(developers).map(([key, valueArr]) => (
              <div
                key={Math.random()}
                className="tooltip-select-dev-label__item-wrapper"
              >
                <div className="tooltip-select-dev-label__item">
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  >
                    <label htmlFor="checkbox">
                      <input
                        className="checkbox"
                        type="checkbox"
                        onChange={() => onClickOption(key)}
                        checked={!!dev[key as keyof Developers]?.length}
                      />
                    </label>
                    <span>
                      {selectCategories.map((category) => {
                        if (category.value === key) {
                          return category.label;
                        }
                      })}
                    </span>
                  </div>
                  <div className="tooltip-select-dev-label__li">
                    {valueArr.map((item: string) => (
                      <div
                        key={Math.random()}
                        style={{
                          display: 'flex',
                        }}
                      >
                        <label htmlFor="checkbox">
                          <input
                            className="checkbox"
                            type="checkbox"
                            onChange={() => onClickSubCat(key, item)}
                            checked={dev[key as keyof Developers].includes(item)}
                          />
                        </label>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
