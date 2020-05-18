import React from 'react';
import './App.css';

import { PeriodicTable } from './PeriodicTable';

function App() {
  return (
    <div className="App" style={{display: 'flex', width: '100vw', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <h2>Periodic Table</h2>
      <PeriodicTable />
    </div>
  );
}

export default App;
