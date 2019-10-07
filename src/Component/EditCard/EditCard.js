import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import s from "./EditCard.module.css";
import { API } from "../../API";
import { Redirect } from "react-router-dom";

export class EditCard extends React.Component {
  state = {
    product: {},
    errors: {},
    redirect: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    API.getProduct(id).then(res =>
      this.setState({
        product: res.body
      })
    );
  }

  editProduct = () => {
    const id = this.props.match.params.id;
    let product = {
      id: this.state.product.id,
      title: this.state.product.title,
      price: parseInt(this.state.product.price),
      quantity: parseInt(this.state.product.quantity),
      image: this.state.product.image,
      inStock: String(this.state.product.inStock) === "true"
    };
    API.editProduct(id, product).then(res => {
      if (res.status === 200) {
        this.setState({
          redirect: true
        });
        alert("Product edit. Changes accepted");
      } else {
        this.setState({
          errors: res.body.errors
        });
      }
    });
  };

  changeValue = e => {
    let product = { ...this.state.product };
    product[e.target.name] = e.target.value;
    this.setState({
      product
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
          <h2 className="text-center">Edit Product</h2>
          <form>
            <div className="form-group">
              <label>
                <mark>id: {this.state.product.id}</mark>
              </label>
              <label>Name Product:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.product.title}
                onChange={this.changeValue}
              />
              {this.showError("title")}
            </div>
            <div className="form-group">
              <label>Price Product:</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={this.state.product.price}
                onChange={this.changeValue}
              />
              {this.showError("price")}
            </div>
            <div className="form-group">
              <label>Quantity Product:</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={this.state.product.quantity}
                onChange={this.changeValue}
              />
              {this.showError("quantity")}
            </div>
            <div className="form-group">
              <label>Url Image Product:</label>
              <input
                className="form-control"
                type="text"
                name="image"
                value={this.state.product.image}
                onChange={this.changeValue}
              />
              {this.showError("image")}
            </div>
            <label className={s.status}>Status Product:</label>
            <select
              value={this.state.product.inStock}
              name="inStock"
              onChange={this.changeValue}
            >
              <option value={true}>in Stock</option>
              <option value={false}>NOT in Stock</option>
            </select>
          </form>
          <div className={s.buttons}>
            <Button
              className={`btn-success + ${s.button}`}
              onClick={this.editProduct}
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
