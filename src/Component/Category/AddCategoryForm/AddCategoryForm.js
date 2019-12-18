import React from "react";
import { Field, reduxForm } from "redux-form";
import { Select } from "../../Select/index";
import { Button } from "../../Button/index";

import s from "./AddCategoryForm.module.css";
import { API } from "../../../Service/API/index";

class AddCategoryForm extends React.Component {
  getAllCategories = async inputValue => {
    let res;
    if (inputValue === "") {
      res = await API.getCategories();
    } else {
      res = await API.filterCategory(inputValue);
    }

    let allCategories = this.showCategories(res.body.content);
    allCategories.unshift({ value: null, label: "None" });
    return allCategories;
  };

  showCategories = categories => {
    let allCategories = [];
    categories.forEach(el => {
      allCategories.push({ value: el.id, label: el.name });
      if (el.childs && el.childs.length > 0) {
        allCategories = [...allCategories, ...this.showCategories(el.childs)];
      }
    });
    return allCategories;
  };

  showError(errorKey) {
    if (this.props.errors[errorKey]) {
      return (
        <div className="alert alert-danger">
          {this.props.errors[errorKey].map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
      );
    }

    return null;
  }

  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <form
        className={s.form}
        onSubmit={e => {
          handleSubmit(e);
          reset();
        }}
      >
        <div>
          <label htmlFor="nameCategory">Name category:</label>
          <Field
            className="form-control"
            name="nameCategory"
            component="input"
            type="text"
          />
          {this.showError("name")}
        </div>
        <div>
          <label htmlFor="slugCategory">Slug:</label>
          <Field
            className="form-control"
            name="slugCategory"
            component="input"
            type="text"
          />
          {this.showError("slug")}
        </div>
        <div>
          <label htmlFor="parent">Parent category:</label>
          <Field
            name="parent"
            component={props => (
              <Select
                {...props}
                allOptions={this.getAllCategories}
                selectKey={this.props.selectKey}
              />
            )}
          />
        </div>
        <Button className={"btn btn-lg btn-info " + s.button_save}>Save</Button>
      </form>
    );
  }
}
export default reduxForm({
  form: "category"
})(AddCategoryForm);
