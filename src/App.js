import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BaseLayout from './components/ModuleLayout/BaseLayout';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
          <BaseLayout/>
      </BrowserRouter>
    </div>
  );
}

export default App;
