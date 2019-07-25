import React from 'react';
import './App.css';
import HomeContainer from "./HomeContainer"
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="mainbody">
      <Route path="/" render={(routerProps) =>< HomeContainer {...routerProps} /> }/>
    </div>
    </Router>

  );
}

export default App;
