import React from "react";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { API } from "../../Service/API";

export class Header extends React.Component {
  logOut = () => {
    API.logOut();
  };

  renderLoginButtons = () => {
    return this.props.user !== null ? (
      <div className={s.buttons}>
        <Button
          onClick={this.logOut}
          className={`btn-primary btn-lg active ${s.btn}`}
        >
          Login Out
        </Button>
      </div>
    ) : (
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
    );
  };

  render() {
    return <div className={s.wrapper}>{this.renderLoginButtons()}</div>;
  }
}
