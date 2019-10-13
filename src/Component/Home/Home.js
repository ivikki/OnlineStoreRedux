import React from "react";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import { ProductList } from "../ProductList";

export class Home extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.buttons}>
          <Link
            to="/registration"
            className={`btn-primary btn-lg active ${s.btn}`}
          >
            Sign Up
          </Link>
          <Link to="/login" className={`btn-primary btn-lg active ${s.btn}`}>
            Login
          </Link>
        </div>
        <h2 className="display-4">Product List</h2>
        <ProductList isAdmin={false} />
      </div>
    );
  }
}
