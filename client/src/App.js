import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
