import React from "react";
import Async from "react-select/async";

export class Select extends React.Component {
  getOptions = inputValue => {
    return this.props.allOptions(inputValue);
  };

  render() {
    const { input } = this.props;

    return (
      <Async
        {...input}
        className="text-left"
        defaultOptions
        loadOptions={this.getOptions}
      />
    );
  }
}
