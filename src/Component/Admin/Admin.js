import React from "react";
import { Link } from "react-router-dom";
import s from "./Admin.module.css";
import { ProductList } from "../ProductList";

export class Admin extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Link
          to="/admin"
          className={`btn-secondary btn-lg active ${s.btn_admin}`}
        >
          Admin
        </Link>
        <h2 className="display-4">Product List</h2>
        <Link to="/admin/add">
          <button type="button" className={`btn btn-lg btn-success ${s.btn}`}>
            Add Product
          </button>
        </Link>
        <ProductList isAdmin={true} />
      </div>
    );
  }
}
