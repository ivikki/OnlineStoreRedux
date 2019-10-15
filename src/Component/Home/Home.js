import React from "react";
import s from "./Home.module.css";
import { ProductList } from "../ProductList";
import { Link } from "react-router-dom";

export class Home extends React.Component {
  renderAdminButton = () => {
    const { user } = this.props;
    if (!user) {
      return null;
    }

    let admin = user.roles.some(el => el.name === "ROLE_ADMIN");
    return admin ? (
      <Link
        to="/admin"
        className={`btn-secondary btn-lg active ${s.btn_admin}`}
      >
        Admin
      </Link>
    ) : null;
  };

  render() {
    return (
      <div className={s.wrapper}>
        {this.renderAdminButton()}
        <h2 className="display-4">Product List</h2>
        <ProductList isAdmin={false} />
      </div>
    );
  }
}
