import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App row">
        <header className="jumbotron row">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Crypton</h1>
            <p>Simple message encrypt-decrypt service</p>
        </header>
      </div>
    );
  }
}

export default App;
