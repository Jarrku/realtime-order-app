import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Drinks from "./pages/Drinks";
import Entrance from "./pages/Entrance";
import Kitchen from "./pages/Kitchen";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Entrance} />
          <Route path="/about" component={Kitchen} />
          <Route path="/topics" component={Drinks} />
        </Switch>
      </Router>
    );
  }
}

export default App;
