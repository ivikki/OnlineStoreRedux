import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../Button";
import img from "./no-image-300x450.jpg";
import { API } from "../../API";
import s from "./Card.module.css";

export class Card extends React.Component {
  renderImage = () => {
    const { product } = this.props;
    return product.image ? <img src={product.image} /> : <img src={img} />;
  };

  removeCard = () => {
    API.deleteProduct(this.props.product.id).then(res => {
      if (res.status !== 200) {
        alert("Failure. Product not removed");
      } else {
        alert("Product removed");
        this.props.deleteCallback(this.props.product.id);
      }
    });
  };

  renderStock = () => {
    return this.props.product.inStock ? (
      <p>Status: in Stock</p>
    ) : (
      <p>Status: NOT in Stock</p>
    );
  };

  renderCard = () => {
    const { product, isAdmin } = this.props;
    return isAdmin ? (
      <div className={s.card}>
        <h3>Name: {product.title}</h3>
        <p>id: {product.id}</p>
        <p>Price: {product.price}$</p>
        <p>Quantity: {product.quantity}</p>
        {this.renderStock()}
        <div>{this.renderImage()}</div>
        <Link to={`/admin/edit/${product.id}`}>
          <Button className={`btn-warning ${s.btn}`}>Edit Product</Button>
        </Link>
        <Button className={`btn-danger ${s.btn}`} onClick={this.removeCard}>
          Remove Product
        </Button>
      </div>
    ) : (
      <Link to={`/product/${product.id}`}>
        <div className={s.card}>
          <h3>{product.title}</h3>
          <p>{product.price}$</p>
          <div>{this.renderImage()}</div>
        </div>
      </Link>
    );
  };

  render() {
    return <div className={s.wrapper}>{this.renderCard()}</div>;
  }
}

Card.propTypes = {
  product: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
