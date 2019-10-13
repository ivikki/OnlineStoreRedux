import React from "react";
import { Link } from "react-router-dom";
import s from "./Login.module.css";
import Button from "react-bootstrap/Button";

export class Login extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <h3>Login</h3>
        <form>
          <label>Email address:</label>
          <input className={s.input} type="email" placeholder="Email" />
          <label>Password:</label>
          <input className={s.input} type="password" placeholder="Password" />
          <Button className={"btn-primary " + s.btn}>Send</Button>
        </form>
        <div className={s.question}>
          <h4>
            Already registered? go to the{" "}
            <Link to="/registration"> registration form</Link>
          </h4>
        </div>
      </div>
    );
  }
}
