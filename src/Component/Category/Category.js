import React from "react";
import { Button } from "../Button";
import { AddCategoryForm } from "./AddCategoryForm";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";

import s from "./Category.module.css";

export class Category extends React.Component {
  state = {
    categories: [],
    selectKey: 0,
    errors: {}
  };

  componentDidMount() {
    this.props.getCategories();
  }

  getCategories = async () => {
    // await API.getCategories().then(res => {
    //   if (res.status === 200) {
    //     this.setState({
    //       categories: res.body.content
    //     });
    //   }
    // });
  };

  handleSubmit = values => {
    this.addCategory(values);
  };

  addCategory = values => {
    let name = values.nameCategory;
    let slug = values.slugCategory || values.nameCategory;
    let parentId = values.parent ? values.parent.value : null;

    this.props.addCategory({ name, slug, parentId });
  };

  deleteCategory = id => {
    API.deleteCategory(id).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category deleted");
        this.props.getCategories();
      }
    });
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

  render() {
    return (
      <div className={s.wrapper}>
        <Link to={"/admin"}>
          <Button className={`btn-lg btn-secondary ${s.btn}`}>Back</Button>
        </Link>
        <h2 className="text-center">Add category</h2>
        <div className={s.category_list}>
          <div className={s.form}>
            <AddCategoryForm
              onSubmit={this.handleSubmit}
              addCategory={this.addCategory}
              selectKey={this.state.selectKey}
              errors={this.props.errors}
            />
          </div>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
              </tr>
            </thead>
            <tbody>{this.showCategoriesList(this.props.categories)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
