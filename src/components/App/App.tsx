import React, {
  lazy, useEffect, useState, Suspense,
} from 'react';
import { Header } from '../Header/Header';
import db from '../../api/fetchData.json';
import { services } from '../../api/services';
import './App.scss';
import { ThemeContext, themes } from '../../context/themeContext';

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

export interface Columns{
    value: string
    label: string
}

export interface SelectCategories{
    value: string
    label: string
}

export interface PaginationSelectI{
    option: number
    id: number
}

export interface RootObject {
    data: ItemRow[]
    columns: Columns[]
    status: string[]
    selectCategories: SelectCategories[]
    developers: Record<string, string[]>
    paginationSelect: PaginationSelectI[]
}

function App() {
  const [dataBase, setDataBase] = useState<RootObject>(null!);
  const [isModeDark, setIsModeDark] = useState<boolean>(true);

  const changeMode = () => setIsModeDark(!isModeDark);

  useEffect(() => {
    services('db').then((result) => {
      setDataBase(result.db);
    });
  }, []);

  return dataBase && (
  <ThemeContext.Provider value={isModeDark ? themes.dark : themes.light}>
    <div className="wrapper">
      <Header changeMode={changeMode} isModeDark={isModeDark} />
      <Suspense fallback={<h1>Loading</h1>}>
        <Grid dataBase={dataBase} />
      </Suspense>
    </div>
  </ThemeContext.Provider>
  );
}

export default App;
