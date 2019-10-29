import React from "react";
import s from "./CategoryList.module.css";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";

export class CategoryList extends React.Component {
  state = {
    category: []
  };

  componentDidMount() {
    API.getCategory().then(res => {
      this.setState({
        category: res.body.content
      });
    });
  }

  showCategory = category => {
    return category.map(el => (
      <ul key={el.id} className={s.category}>
        <li>
          <Link to={`/category/${el.id}`}>{el.name}</Link>
        </li>
        {el.childs.length > 0 ? this.showCategory(el.childs) : null}
      </ul>
    ));
  };

  render() {
    return (
      <div className={s.wrapper}>
        <h2 className="text-center">Select category</h2>
        <div className={s.category_wrapper}>
          {this.state.category.length > 0
            ? this.showCategory(this.state.category)
            : null}
        </div>
      </div>
    );
  }
}
