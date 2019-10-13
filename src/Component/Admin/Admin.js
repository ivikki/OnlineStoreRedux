import React from "react";
import { Link } from "react-router-dom";
import s from "./Admin.module.css";
import { ProductList } from "../ProductList";

export class Admin extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <h2 className="display-4">Product List</h2>
        <Link to="/admin/add" className={`btn btn-lg btn-success ${s.btn}`}>
          Add Product
        </Link>
        <ProductList isAdmin={true} />
      </div>
    );
  }
}
