import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import s from "./Home.module.css";
import { ProductList } from "../ProductList";

export class Home extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <h2 className="display-4">Product List</h2>
        <Link to="/admin">
          <Button className={`btn-secondary btn-lg active ${s.btn}`}>
            Admin
          </Button>
        </Link>
        <ProductList isAdmin={false} />
      </div>
    );
  }
}
