import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import Continents from './Continents'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Country from './Country'

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News</h1>
        </header>

        <Router>
          <div>
            <Route exact path="/" component={Continents} />
            <Route exact path="/country" component={Country} />
          </div>
        </Router>




      </div>
    );
  }
}

export default App;
