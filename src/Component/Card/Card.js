import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import img from "./no-image-300x450.jpg";
import s from "./Card.module.css";

export class Card extends React.Component {
  renderImage = () => {
    const { product } = this.props;
    return product.image ? <img src={product.image} /> : <img src={img} />;
  };

  removeCard = async () => {
    const res = await this.props.deleteProductEvent(this.props.product.id);
    this.props.deleteCallback(res);
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
        <Link
          to={`/admin/edit/${product.id}`}
          className={`btn btn-warning ${s.btn}`}
        >
          Edit Product
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
