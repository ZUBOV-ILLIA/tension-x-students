import React from 'react';
import './App.scss';
import { Students } from './components/Students';

const App: React.FC = () => {
  return (
    <div className="base">
      <Students />
    </div>
  );
}

export default App;
