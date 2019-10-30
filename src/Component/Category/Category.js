import React from "react";
import s from "./Category.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";
import { SelectCategory } from "../SelectCategory";

export class Category extends React.Component {
  state = {
    inputText: "",
    slugText: "",
    categories: [],
    parentId: ""
  };

  getAllCategories = async inputValue => {
    let res;
    if (inputValue === "") {
      res = await API.getCategories();
    } else {
      res = await API.filterCategory(inputValue);
    }
    this.setState({
      categories: res.body.content
    });

    return this.showCategories(res.body.content);
  };

  getCategories = async () => {
    await API.getCategories().then(res => {
      if (res.status === 200) {
        this.setState({
          categories: res.body.content
        });
      }
    });
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
    let slug = this.state.slugText || this.state.inputText;
    let parentId = this.state.parentId;
    API.addCategory(text, parentId, slug).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category added");
        this.setState({
          inputText: "",
          slugText: ""
        });
        this.getCategories();
      }
    });
  };

  deleteCategory = id => {
    API.deleteCategory(id).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category deleted");
        this.getCategories();
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
        <tr key={el.id} className={s.table_row}>
          <td>
            {"—".repeat(deep) + " " + el.name}
            <div>
              <Link to={`/admin/edit/category/${el.id}`}>
                <span>Edit</span>
              </Link>
              <span
                className={s.btn_delete}
                onClick={() => this.deleteCategory(el.id)}
              >
                Delete
              </span>
            </div>
          </td>
          <td>{el.slug}</td>
        </tr>
        {el.childs && el.childs.length > 0
          ? this.showCategoriesList(el.childs, deep + 1)
          : null}
      </>
    ));
  };

  getParentId = selectedOption => {
    this.setState({
      parentId: selectedOption.value
    });
  };

  saveSlugText = e => {
    let slugText = e.target.value;
    this.setState({
      slugText
    });
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
            <label>Slug:</label>
            <input
              className="form-control"
              onChange={this.saveSlugText}
              value={this.state.slugText}
            />
            <label>Parent category:</label>
            <SelectCategory
              getAllCategories={this.getAllCategories}
              getParentId={this.getParentId}
            />
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
