import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "../Button";
import { API } from "../../Service/API";

import s from "./Login.module.css";

export class Login extends React.Component {
  state = {
    redirect: false
  };

  emailRef = React.createRef();
  passwordRef = React.createRef();

  loginHandler = async () => {
    let res = await API.login(
      this.emailRef.current.value,
      this.passwordRef.current.value
    );

    if (res.status !== 200) {
      this.props.showErrorEvent("Bad credentials");
    } else {
      API.tryRestoreSession();

      this.setState({
        redirect: true
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={s.wrapper}>
        <Link to="/" className={`btn-primary btn-lg active ${s.btn_admin}`}>
          Home
        </Link>
        <h3>Login</h3>
        <form>
          <label>Email address:</label>
          <input
            ref={this.emailRef}
            className={s.input}
            type="email"
            placeholder="Email"
          />
          <label>Password:</label>
          <input
            ref={this.passwordRef}
            className={s.input}
            type="password"
            placeholder="Password"
          />
          <Button
            type="button"
            onClick={this.loginHandler}
            className={"btn btn-primary " + s.btn}
          >
            Send
          </Button>
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
