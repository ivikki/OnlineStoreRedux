import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import s from "./AddCard.module.css";
import { API } from "../../API";
import { Redirect } from "react-router-dom";

export class AddCard extends React.Component {
  state = {
    redirect: false,
    errors: {}
  };

  refTitle = React.createRef();
  refPrice = React.createRef();
  refQuantity = React.createRef();
  refUrl = React.createRef();
  refStock = React.createRef();

  handleClick = e => {
    e.preventDefault();
    let product = {
      title: this.refTitle.current.value,
      price: parseInt(this.refPrice.current.value),
      quantity: parseInt(this.refQuantity.current.value),
      image: this.refUrl.current.value,
      inStock: this.refStock.current.value === "true"
    };

    API.addProduct(product).then(res => {
      if (res.status === 200) {
        this.setState({
          redirect: true
        });
      } else {
        alert("Error. Component not added.");
        this.setState({
          errors: res.body.errors
        });
      }
    });
  };

  showError(errorKey) {
    if (this.state.errors[errorKey]) {
      return (
        <div className="alert alert-danger">
          {this.state.errors[errorKey].map(e => (
            <span>{e}</span>
          ))}
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin" />;
    }

    return (
      <div className={s.wrapper}>
        <div className={s.modal}>
          <h2 className="text-center">Add Product</h2>
          <form>
            <div className="form-group">
              <label>Title Product:</label>
              <input
                className="form-control"
                name="title"
                type="text"
                ref={this.refTitle}
              />
              {this.showError("title")}
            </div>
            <div className="form-group">
              <label>Price Product:</label>
              <input
                className="form-control"
                name="price"
                type="number"
                ref={this.refPrice}
              />
              {this.showError("price")}
            </div>
            <div className="form-group">
              <label>Quantity Product:</label>
              <input
                className="form-control"
                name="quantity"
                type="number"
                ref={this.refQuantity}
              />
              {this.showError("quantity")}
            </div>
            <div className="form-group">
              <label>Url Image Product:</label>
              <input
                className="form-control"
                name="image"
                type="text"
                ref={this.refUrl}
              />
              {this.showError("image")}
            </div>
            <label className={s.status}>Status Product:</label>
            <select ref={this.refStock}>
              <option value={true}>in Stock</option>
              <option value={false}>NOT in Stock</option>
            </select>
          </form>
          <div className={s.buttons}>
            <Button
              className={`btn-primary ${s.button}`}
              onClick={this.handleClick}
            >
              Save
            </Button>
            <Link to={"/admin"}>
              <Button className={`btn-secondary ${s.button}`}>Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
