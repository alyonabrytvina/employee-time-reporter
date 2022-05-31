import React, { useContext } from 'react';
import { Header } from './Header/Header';
import { Excel } from './components/Excel/Excel';
import db from './api/fetchData.json';

export interface ItemRow{
    taskName: string,
    developers: string | string[],
    workType: string | string[],
    status: string,
    estimation: number,
    totalTimeSpent: number,
    myTimeSpentByPeriod: number,
    efficiency: number,
    id: number
}

interface People{
    allPeople: Record<string, string[]>
}

interface Database{
    tasks: ItemRow[]
    columns: Record<string, string[]>
    status: string[]
    select: Record<string, string[]>
    developers: People
}

function App() {
  const {
    tasks, columns: { labels }, status, developers: { allPeople }, select: { labelsDev },
  } = db as unknown as Database;

  return (
    <div>
      <Header />
      <Excel<ItemRow>
        tasks={tasks}
        labelsCell={labels}
        status={status}
        dev={allPeople}
        labelsDev={labelsDev}
      />
    </div>
  );
}

export default App;
