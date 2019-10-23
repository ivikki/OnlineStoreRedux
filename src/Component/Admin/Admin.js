import React from "react";
import { Link, Redirect } from "react-router-dom";
import s from "./Admin.module.css";
import { ProductList } from "../ProductList";

export class Admin extends React.Component {
  isAdmin = () => {
    const { user } = this.props;
    if (!user) {
      return false;
    }

    return user.roles.some(el => el.name === "ROLE_ADMIN");
  };

  render() {
    if (!this.isAdmin()) {
      return <Redirect to="/" />;
    }

    return (
      <div className={s.wrapper}>
        <Link to="/" className={`btn-primary btn-lg ${s.btn_admin}`}>
          Home
        </Link>
        <Link
          to="/admin/category"
          className={`btn-success btn-lg ${s.btn_category}`}
        >
          Category
        </Link>
        <h2 className="display-4">Product List</h2>
        <Link to="/admin/add" className={`btn btn-lg btn-success ${s.btn}`}>
          Add Product
        </Link>
        <ProductList isAdmin={true} />
      </div>
    );
  }
}
