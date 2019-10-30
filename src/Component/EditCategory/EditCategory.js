import React from "react";
import s from "./EditCategory.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";
import { SelectCategory } from "../SelectCategory";
import { Redirect } from "react-router-dom";

export class EditCategory extends React.Component {
  state = {
    categoryName: "",
    categorySlug: "",
    redirect: false
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    API.getCategories(id).then(res => {
      if (res.status === 200) {
        console.log(res.body);
        this.setState({
          categoryName: res.body.name,
          categorySlug: res.body.slug
        });
      }
    });
  }

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

  saveInputText = e => {
    let inputText = e.target.value;
    this.setState({
      categoryName: inputText
    });
  };

  saveSlugText = e => {
    let slugText = e.target.value;
    this.setState({
      categorySlug: slugText
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

  editCategory = async e => {
    e.preventDefault();
    let name = this.state.categoryName;
    let slug = this.state.categorySlug;
    let id = this.props.match.params.id;
    let parentId = this.state.parentId;
    API.editCategory(id, name, slug, parentId).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category edited");
        this.setState({
          redirect: true
        });
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/category" />;
    }

    return (
      <div className={s.wrapper}>
        <Link to={"/admin/category"}>
          <Button className={`btn-lg btn-secondary ${s.btn}`}>Back</Button>
        </Link>
        <h2 className="text-center">Edit Category</h2>
        <div className={s.category_list}>
          <form className={s.form}>
            <label>Name category:</label>
            <input
              className="form-control"
              onChange={this.saveInputText}
              value={this.state.categoryName}
            />
            <label>Slug:</label>
            <input
              className="form-control"
              onChange={this.saveSlugText}
              value={this.state.categorySlug}
            />
            <label>Parent category:</label>
            <SelectCategory getAllCategories={this.getAllCategories} />
            <Button
              className={"btn btn-lg btn-info " + s.button_save}
              onClick={this.editCategory}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
