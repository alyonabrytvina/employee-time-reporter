import React, {
  lazy, useState, Suspense, useEffect,
} from 'react';
import { Header } from '../Header/Header';
import './App.scss';
import { ThemeContext, themes } from '../../context/themeContext';

import { services } from '../../api/services';

const Grid = lazy(() => import('../GridRoot/Grid/Grid'));

export interface ItemRow{
    taskName: string,
    developers: string[],
    workType: string|string[],
    status: string,
    totalTimeSpent: number,
    myTimeSpentByPeriod: number,
    estimation: number,
    efficiency: number|null,
    id: number
}

export interface Column{
    value: string
    label: string
}

export interface SelectCategory{
    value: string
    label: string
}

export interface PaginationSelectI{
    option: number
    id: number
}

function App() {
  const [isModeDark, setIsModeDark] = useState<boolean>(true);
  const [dataBase, setDataBase] = useState<Record<string, string[]>>({});
  const changeMode = () => setIsModeDark(!isModeDark);

  const { dark, light } = themes;

  useEffect(() => {
    services('db').then((response) => {
      setDataBase(response);
    });
  }, []);

  return Object.keys(dataBase).length ? (
    <ThemeContext.Provider value={isModeDark ? dark : light}>
      <div className="wrapper">
        <Header changeMode={changeMode} isModeDark={isModeDark} />
        <Suspense fallback={<h1>Loading</h1>}>
          <Grid dataBase={dataBase} />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  ) : <div>loading...</div>;
}

export default App;
