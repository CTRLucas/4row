import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/LoggedOut/Login";
import Register from "./components/LoggedOut/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch></Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
