import React from "react";
import PropTypes from "prop-types";

export class Button extends React.Component {
  render() {
    const { className, children, ...rest } = this.props;

    return (
      <button className={`btn ${className}`} {...rest}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired
};
