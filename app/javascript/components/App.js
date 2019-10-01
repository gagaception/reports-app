import React from 'react';
import { Route } from 'react-router-dom';
import Main from './Main';
import './App.css';

const App = () => ( 
  <div>
    <Route path="/reports/:id?" component={Main} />
  </div>
);

export default App;