import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
class App extends Component {
  state = {
    
  };

 

  render() {
    return (
      <div>
        <div className="pt-5 px-5 mx-5">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
