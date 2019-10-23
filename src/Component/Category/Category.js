import React from "react";
import s from "./Category.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";

export class Category extends React.Component {
  state = {
    inputText: "",
    category: []
  };

  componentDidMount() {
    API.getCategory().then(res => {
      this.setState({
        category: res.body.content
      });
    });
  }

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
        this.setState({
          inputText: ""
        });
      }
    });
  };

  showCategory = category => {
    return category.map(el => (
      <ul key={el.id}>
        <li>{el.name}</li>
        {el.childs.length > 0 ? <ul>{this.showCategory(el.childs)}</ul> : null}
      </ul>
    ));
  };

  render() {
    return (
      <div className={s.wrapper}>
        <Link to={"/admin"}>
          <Button className={`btn-lg btn-secondary ${s.btn}`}>Back</Button>
        </Link>
        <h2 className="text-center">Category</h2>
        {this.state.category.length > 0
          ? this.showCategory(this.state.category)
          : null}
        <h5>Add new category</h5>
        <form>
          <label>Name category:</label>
          <input onChange={this.saveInputText} value={this.state.inputText} />
          <Button
            className={"btn btn-info " + s.button_save}
            onClick={this.addCategory}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}
