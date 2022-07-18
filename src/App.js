import React from 'react';
import './App.css';
import SWTable from './components/Table';
import ProviderOfPlanets from './context/ProviderOfPlanets';
import FilterPlanets from './components/Filter';

function App() {
  return (
    <div>
      <h1>Star Wars Planets Search</h1>
      <ProviderOfPlanets>
        <FilterPlanets />
        <SWTable />
      </ProviderOfPlanets>
    </div>
  );
}

export default App;
