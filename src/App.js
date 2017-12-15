import React, { Component } from "react";
import {Jumbotron} from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import CryptonService from "./CryptonService";

class App extends Component {
    render() {
        return (
            <div className="App row">
                <header>
                    <Jumbotron>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">
                            Welcome to Crypton
                        </h1>
                        <p>Simple message encrypt-decrypt service</p>
                    </Jumbotron>
                </header>
                <CryptonService />
            </div>
        );
    }
}

export default App;
