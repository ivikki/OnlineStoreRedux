import React from "react";
import Async from "react-select/async";

export class SelectCategory extends React.Component {
  state = {
    selectedOption: null
  };

  handleChange = (selectedOption, e) => {
    this.setState({
      selectedOption
    });
    this.props.getParentId(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Async
        className="text-left"
        value={selectedOption}
        onChange={this.handleChange}
        defaultOptions
        loadOptions={this.props.getAllCategories}
      />
    );
  }
}
