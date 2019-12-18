import React from "react";
import { Field, reduxForm } from "redux-form";
import { Select } from "../../Select/index";
import { Button } from "../../Button/index";

import s from "./AddCardForm.module.css";
import { API } from "../../../Service/API/index";
import { Link } from "react-router-dom";

class AddCardForm extends React.Component {
  getAllCategories = async inputValue => {
    let res;
    if (inputValue === "") {
      res = await API.getCategories();
    } else {
      res = await API.filterCategory(inputValue);
    }

    return this.showCategories(res.body.content);
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
        <div className="form-group">
          <label htmlFor="category">Name category:</label>
          <Field
            name="category"
            component={props => (
              <Select {...props} allOptions={this.getAllCategories} />
            )}
          />
          {this.showError("category")}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title Product:</label>
          <Field
            className="form-control"
            name="title"
            component="input"
            type="text"
          />
          {this.showError("title")}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price Product:</label>
          <Field
            className="form-control"
            name="price"
            component="input"
            type="number"
          />
          {this.showError("price")}
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity Product:</label>
          <Field
            className="form-control"
            name="quantity"
            component="input"
            type="number"
          />
          {this.showError("quantity")}
        </div>
        <div className="form-group">
          <label htmlFor="image">Url Image Product:</label>
          <Field
            className="form-control"
            name="image"
            component="input"
            type="text"
          />
          {this.showError("image")}
        </div>
        <div className={"form-group " + s.status}>
          <label htmlFor="status">Status Product:</label>
          <span>in Stock</span>
          <Field
            checked
            name="status"
            component="input"
            type="radio"
            value="true"
          />
          <span>NOT in Stock</span>
          <Field name="status" component="input" type="radio" value="false" />
        </div>
        <div className={s.buttons}>
          <Button className={`btn-primary ${s.button}`}>Save</Button>
          <Link to={"/admin"}>
            <Button className={`btn-secondary ${s.button}`}>Cancel</Button>
          </Link>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: "category"
})(AddCardForm);
