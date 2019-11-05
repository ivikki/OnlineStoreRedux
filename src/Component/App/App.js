import React from "react";
import { Router, Route } from "react-router-dom";
import { Home } from "../Home";
import { Admin } from "../Admin";
import { AddCard } from "../AddCard";
import { EditCard } from "../EditCard";
import { Product } from "../Product";
import { Message } from "../Message";
import { Registration } from "../Registration";
import { Category } from "../Category";
import { EditCategory } from "../EditCategory";
import { CategoryList } from "../CategoryList";
import { Login } from "../Login";
import { Header } from "../Header";
import { API } from "../../Service/API";
import { history } from "../../Service/History";

export class App extends React.Component {
  componentDidMount() {
    API.tryRestoreSession().finally(this.props.appInitEvent);
  }

  render() {
    if (!this.props.appIsInit) {
      return (
        <div className="image">
          <img
            src="https://loading.io/spinners/microsoft/index.rotating-balls-spinner.svg"
            alt="loading"
          />
        </div>
      );
    }

    return (
      <>
        <Message />
        <Router history={history}>
          <Route path="/" component={Header} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/category/:id" component={Home} />
          <Route path="/" exact component={CategoryList} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/add" component={AddCard} />
          <Route exact path="/admin/edit/:id" component={EditCard} />
          <Route path="/product/:id" component={Product} />
          <Route path="/admin/category" component={Category} />
          <Route path="/admin/edit/category/:id" component={EditCategory} />
        </Router>
      </>
    );
  }
}
