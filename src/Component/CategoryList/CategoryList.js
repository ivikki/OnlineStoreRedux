import React from "react";
import s from "./CategoryList.module.css";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";

export class CategoryList extends React.Component {
  state = {
    categories: []
  };

  componentDidMount() {
    API.getCategories().then(res => {
      if (res.status === 200) {
        this.setState({
          categories: res.body.content
        });
      }
    });
  }

  showCategories = categories => {
    return categories.map(el => (
      <ul key={el.id} className={s.category}>
        <li>
          <Link to={`/category/${el.id}`}>{el.name}</Link>
        </li>
        {el.childs.length > 0 ? this.showCategories(el.childs) : null}
      </ul>
    ));
  };

  render() {
    return (
      <div className={s.wrapper}>
        <h2 className="text-center">Select category</h2>
        <div className={s.category_wrapper}>
          {this.state.categories.length > 0
            ? this.showCategories(this.state.categories)
            : null}
        </div>
      </div>
    );
  }
}
