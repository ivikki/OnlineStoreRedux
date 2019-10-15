import React from "react";
import { Link, Redirect } from "react-router-dom";
import s from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import { API } from "../../Service/API";

export class Registration extends React.Component {
  state = {
    redirect: false,
    errors: {}
  };

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  confirmPasswordRef = React.createRef();

  signUpHandler = e => {
    e.preventDefault();
    let user = {
      confirmPassword: this.confirmPasswordRef.current.value,
      email: this.emailRef.current.value,
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      password: this.passwordRef.current.value
    };
    API.singUp(user).then(res => {
      if (res.status === 200) {
        this.setState({
          redirect: true
        });
      } else {
        this.setState({
          errors: res.body.errors || {}
        });
      }
    });
  };

  showError(errorKey) {
    if (this.state.errors[errorKey]) {
      return (
        <div className="alert alert-danger">
          {this.state.errors[errorKey].map(e => (
            <span>{e}</span>
          ))}
        </div>
      );
    }

    return null;
  }

  clearErrors = () => {
    this.setState({
      errors: {}
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={s.wrapper}>
        <h3>Registration</h3>
        <Link to="/" className={`btn-primary btn-lg active ${s.btn_admin}`}>
          Home
        </Link>
        <form onFocus={this.clearErrors}>
          <div className={s.wrapper_form}>
            <div className={s.wrapper_form_item}>
              <label className={s.label}>First Name:</label>
              <input
                className={s.input}
                ref={this.firstNameRef}
                type="text"
                placeholder="First Name"
              />
              {this.showError("firstName")}
              <label className={s.label}>Last Name:</label>
              <input
                className={s.input}
                ref={this.lastNameRef}
                type="text"
                placeholder="Last Name"
              />
              {this.showError("lastName")}
              <label>Email address:</label>
              <input
                className={s.input}
                ref={this.emailRef}
                type="email"
                placeholder="Email"
              />
              {this.showError("email")}
            </div>
            <div className={s.wrapper_form_item}>
              <label className={s.label}>Password:</label>
              <input
                className={s.input}
                ref={this.passwordRef}
                type="password"
                placeholder="Password"
              />
              {this.showError("password")}
              <label className={s.label}>Confirm Password:</label>
              <input
                className={s.input}
                ref={this.confirmPasswordRef}
                type="password"
                placeholder="Password"
              />
              {this.showError("password")}
            </div>
          </div>
          <Button
            className={"btn btn-primary " + s.btn}
            onClick={this.signUpHandler}
          >
            Send
          </Button>
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
