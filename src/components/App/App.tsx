import React, {
  lazy, useState, Suspense,
} from 'react';
import { Header } from '../Header/Header';
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

export interface RootObject {
    data: ItemRow[]
    columns: Column[]
    status: string[]
    selectCategories: SelectCategory[]
    developers: Record<string, string[]>
    paginationSelect: PaginationSelectI[]
}

function App() {
  const [isModeDark, setIsModeDark] = useState<boolean>(true);
  const changeMode = () => setIsModeDark(!isModeDark);

  return (
    <ThemeContext.Provider value={isModeDark ? themes.dark : themes.light}>
      <div className="wrapper">
        <Header changeMode={changeMode} isModeDark={isModeDark} />
        <Suspense fallback={<h1>Loading</h1>}>
          <Grid />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
