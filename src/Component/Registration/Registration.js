import React from "react";
import { Link } from "react-router-dom";
import s from "./Registration.module.css";
import Button from "react-bootstrap/Button";

export class Registration extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <h3>Registration</h3>
        <form>
          <div className={s.wrapper_form}>
            <div className={s.wrapper_form_item}>
              <label className={s.label}>First Name:</label>
              <input className={s.input} type="text" placeholder="First Name" />
              <label className={s.label}>Last Name:</label>
              <input className={s.input} type="text" placeholder="Last Name" />
              <label>Email address:</label>
              <input className={s.input} type="email" placeholder="Email" />
            </div>
            <div className={s.wrapper_form_item}>
              <label>Password:</label>
              <input
                className={s.input}
                type="password"
                placeholder="Password"
              />
              <label>Confirm Password:</label>
              <input
                className={s.input}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <Button className={"btn-primary " + s.btn}>Send</Button>
        </form>
        <div className={s.question}>
          <h4>
            Already registered? go to the <Link to="/login"> login form</Link>
          </h4>
        </div>
      </div>
    );
  }
}
