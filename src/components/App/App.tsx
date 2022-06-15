import React, {
  lazy, useEffect, useState, Suspense,
} from 'react';
import { Header } from '../Header/Header';
import db from '../../api/fetchData.json';
import { services } from '../../api/services';
import './App.scss';

const Grid = lazy(() => import('../Grid/Grid'));

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

export interface PaginationSelect{
    option: number
    id: number
}

export interface RootObject {
    data: ItemRow[]
    columns: Columns[]
    status: string[]
    selectCategories: SelectCategories[]
    developers: Record<string, string[]>
    paginationSelect: PaginationSelect[]
}

function App() {
  const [dataBase, setDataBase] = useState<RootObject>(null!);

  useEffect(() => {
    services('db').then((result) => {
      setDataBase(result.db);
    });
  }, []);

  return dataBase && (
    <div className="wrapper">
      <Header />
      <Suspense fallback={<h1>Loading</h1>}>
        <Grid dataBase={dataBase} />
      </Suspense>
    </div>
  );
}

export default App;
