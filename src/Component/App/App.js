import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "../Home";
import { Admin } from "../Admin";
import { AddCard } from "../AddCard";
import { EditCard } from "../EditCard";
import { Product } from "../Product";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/add" component={AddCard} />
        <Route path="/admin/edit/:id" component={EditCard} />
        <Route path="/product/:id" component={Product} />
      </Router>
    );
  }
}
