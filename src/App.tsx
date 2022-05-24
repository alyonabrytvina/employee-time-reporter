import React from 'react';
import { Header } from './Header/Header';
import { Excel } from './components/Excel/Excel';
import db from './api/fetchData.json';

interface Data{
    age: string
    email: string
    name: string
    phone: string
    room: string
    id: number
}

interface Database{
    neighbours: Data[]
    columns: Record<string, string[]>
}

function App() {
  const { neighbours, columns: { labels } } = db as unknown as Database;

  return (
    <div>
      <Header />
      <Excel<Data> data={neighbours} labels={labels} />
    </div>
  );
}

export default App;
