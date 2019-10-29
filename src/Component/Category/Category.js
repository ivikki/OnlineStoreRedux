import React from "react";
import s from "./Category.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";
import { SelectCategory } from "../SelectCategory";

export class Category extends React.Component {
  state = {
    inputText: "",
    categories: []
  };

  getAllCategories = async inputValue => {
    let res;
    if (inputValue === "") {
      res = await API.getCategory();
    } else {
      res = await API.filterCategory(inputValue);
    }
    this.setState({
      categories: res.body.content
    });

    return this.showCategories(res.body.content);
  };

  saveInputText = e => {
    let inputText = e.target.value;
    this.setState({
      inputText
    });
  };

  addCategory = e => {
    e.preventDefault();
    let text = this.state.inputText;
    API.addCategory(text).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category added");
        this.setState({
          inputText: ""
        });
      }
    });
  };

  showCategories = categories => {
    let cat = [];
    categories.forEach(el => {
      cat.push({ value: el.id, label: el.name });
      if (el.childs && el.childs.length > 0) {
        cat = [...cat, ...this.showCategories(el.childs)];
      }
    });
    return cat;
  };

  showCategoriesList = (categories, deep = 0) => {
    return categories.map(el => (
      <>
        <tr key={el.id}>
          <td>{"&#8212".repeat(deep) + " " + el.name}</td>
          <td>{el.slug}</td>
        </tr>
        {el.childs.length > 0
          ? this.showCategoriesList(el.childs, deep + 1)
          : null}
      </>
    ));
  };

  render() {
    return (
      <div className={s.wrapper}>
        <Link to={"/admin"}>
          <Button className={`btn-lg btn-secondary ${s.btn}`}>Back</Button>
        </Link>
        <h2 className="text-center">Category</h2>
        <div className={s.category_list}>
          <form className={s.form}>
            <h3>Add new category</h3>
            <label>Name category:</label>
            <input
              className="form-control"
              onChange={this.saveInputText}
              value={this.state.inputText}
            />
            <label>Parent category:</label>
            <SelectCategory getAllCategories={this.getAllCategories} />
            <Button
              className={"btn btn-lg btn-info " + s.button_save}
              onClick={this.addCategory}
            >
              Save
            </Button>
          </form>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
              </tr>
            </thead>
            <tbody>{this.showCategoriesList(this.state.categories)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
