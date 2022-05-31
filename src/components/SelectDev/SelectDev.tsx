import React, { useContext, useEffect, useState } from 'react';
import arrow from '../../assets/svgs/arrow.svg';
import dropdown from '../../assets/svgs/dropdown.svg';
import './SelectDev.scss';
import { useDataContext } from '../../context';

export function SelectDev() {
  const { onChangeSelectDev, labelsDev, dev } = useDataContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [devCategory, setDevCategory] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [isSubCatChecked, setIsSubCatChecked] = useState<boolean>(true);
  const [subDevCategory, setSubDevCategory] = useState<string[]>([]);

  const [devCategoryLength, setDevCategoryLength] = useState<number>(0);

  useEffect(() => {
    const devArray = labelsDev.map((label) => Object.values(label).map((value) => setDevCategory(((prevState) => [...prevState, value]))));
    Object.values(dev).forEach((developer) => setSubDevCategory((prevState) => [...prevState, ...developer]));
    setDevCategoryLength(devArray.length);
  }, []);

  useEffect(() => {
    onChangeSelectDev(devCategory, subDevCategory);
  }, [devCategory, subDevCategory]);

  const onClickOpen = () => setIsOpen(!isOpen);

  const onClickSubCat = (item: string) => {
    setIsSubCatChecked(!isSubCatChecked);

    if (subDevCategory.includes(item)) {
      setSubDevCategory((prevState) => prevState.filter((state) => state !== item));
    } else {
      setSubDevCategory((prevState) => [...prevState, item]);
    }
  };

  useEffect(() => {
    if (!isChecked) {
      setSubDevCategory([]);
      setDevCategory([]);
    }
  }, [isChecked]);

  const onClickOption = (value: string) => {
    // // console.log(devCategoryLength, devCategory.length);
    // if (devCategoryLength !== devCategory.length) {
    //   setDevCategory((prevState) => prevState.filter((state) => value !== 'All people'));
    // }

    if (devCategory.includes(value)) {
      setDevCategory((prevState) => prevState.filter((state) => state !== value));
    } else {
      setDevCategory((prevState) => [...prevState, value]);
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
        {devCategoryLength === devCategory.length ? 'All people' : [...devCategory].join(', ')}
      </div>
      <div className="select-dev__arrow">
        <img src={isOpen ? dropdown : arrow} alt="arrow" />
      </div>
      {isOpen ? (
        <div id="tooltip-select-dev" className="left">
          <div className="tooltip-select-dev-arrow" />
          <div className="tooltip-select-dev-label">
            {labelsDev.map((category) => Object.entries(category).map(([key, value]) => (
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
                    <input type="checkbox" onChange={() => onClickOption(value)} checked={devCategory.includes(value) && isChecked} />
                    <span>{value}</span>
                  </div>
                  {devCategory.includes(value) ? (
                    <div className="tooltip-select-dev-label__li">
                      {dev[key] !== undefined && dev[key].map((item) => (
                        <div
                          key={Math.random()}
                          style={{
                            display: 'flex',
                          }}
                        >
                          <input type="checkbox" onChange={() => onClickSubCat(item)} checked={subDevCategory.includes(item) && isChecked} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : ''}
                  <br />
                </div>
              </div>
            )))}
          </div>
        </div>
      ) : ''}
    </div>
  );
}
