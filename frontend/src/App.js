import 'bulmaswatch/darkly/bulmaswatch.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage';
import Navbar from './components/navbar';

class App extends Component {

  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <div className="container">
          <div className="columns">
            <Switch>
              <Route path="/stats">Statisztika</Route>
              <Route path="/infected">Fertőzöttek</Route>
              <Route path="/"><Homepage /></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;