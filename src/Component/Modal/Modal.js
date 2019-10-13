import React from "react";
import ReactDOM from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

export class Modal extends React.Component {
  state = {
    isOpen: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.message || props.error) {
      return {
        isOpen: true
      };
    }

    return null;
  }

  shadowClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({
        isOpen: false
      });
    }
  };

  redirectCallBack = () => {
    this.setState({
      isOpen: false
    });
    if (this.props.error !== null) {
      this.props.actionClearErrorEvent();
    } else if (this.props.message !== null) {
      this.props.actionClearMessageEvent();
    }
  };

  renderModal() {
    return (
      <div className={s.shadow} onClick={this.shadowClick}>
        <div className={s.modal}>
          <p>{this.props.error || this.props.message}</p>
          <button className={s.close} onClick={this.redirectCallBack} />
          <button
            className={"btn btn-secondary " + s.button}
            onClick={this.redirectCallBack}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isOpen === false) {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), modalRoot);
  }
}
