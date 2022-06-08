import React, { useEffect, useState } from 'react';
import arrow from '../../assets/svgs/arrow.svg';
import dropdown from '../../assets/svgs/dropdown.svg';
import './SelectDev.scss';
import { useDataContext } from '../../context';

export interface Developers{
  design: string[]
  frontend: string[]
  backend: string[]
  pms: string[]
}

export function SelectDev() {
  const {
    onChangeSelectDev, dev, selectCategories,
    categoriesValues, categoriesLabels,
  } = useDataContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>(categoriesValues);
  const [developers, setDevelopers] = useState<Record<string, string[]>>(dev);

  const [initialCategoriesLength, setInitialCategoriesLength] = useState<number>(0);
  const [optionsNames, setOptionsNames] = useState<string[]>(categoriesLabels);

  const onClickOpen = () => setIsOpen(!isOpen);

  const onClickSubCat = (key: string, item: string) => {
    if (developers[key as keyof Developers]?.includes(item)) {
      setDevelopers((prevState) => ({
        ...prevState,
        [key]: prevState[key as keyof Developers].filter((state: string) => state !== item),
      }));
    } else {
      setDevelopers((prevState) => ({
        ...prevState,
        [key]: [...prevState[key as keyof Developers], item],
      }));
    }
  };

  useEffect(() => {
    const values = Object.values(developers).reduce((total, currentValue) => (total).concat(currentValue), []);
    onChangeSelectDev(values);
  }, [categories, developers]);

  useEffect(() => {
    setInitialCategoriesLength(categoriesValues.length);
  }, []);

  const onClickOption = (key: string) => {
    if (categories.includes(key)) {
      setCategories((prevState) => prevState.filter((state) => state !== key));

      setDevelopers((prevState) => ({
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

      selectCategories.filter((category) => {
        if (category.value === key) {
          return setOptionsNames((prevState) => [...prevState, category.label]);
        }
      });

      setDevelopers((prevState) => ({
        ...prevState,
        [key]: dev[key as keyof Developers],
      }));
    }
  };

  return (
    <div
      className="select-dev-wrapper"
    >
      <div
        className="select-dev"
        onClick={onClickOpen}
      >
        {categories?.length === initialCategoriesLength ? 'All people' : [...optionsNames].join(', ')}
      </div>
      <div className="select-dev__arrow">
        <img src={isOpen ? dropdown : arrow} alt="arrow" />
      </div>
      {isOpen && (
        <div id="tooltip-select-dev" className="left">
          <div className="tooltip-select-dev-arrow" />
          <div className="tooltip-select-dev-label">
            {Object.entries(dev).map(([key, valueArr]) => (
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
                    <input
                      type="checkbox"
                      onChange={() => onClickOption(key)}
                      checked={!!developers[key as keyof Developers]?.length}
                    />
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
                        <input
                          type="checkbox"
                          onChange={() => onClickSubCat(key, item)}
                          checked={developers[key as keyof Developers]?.includes(item)}
                        />
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
