import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { CommentList } from "../CommentList";
import img from "./stock.png";
import image from "./no-image-300x450.jpg";
import s from "./Product.module.css";
import { API } from "../../Service/API";

export class Product extends React.Component {
  state = {
    product: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    API.getProduct(id).then(res =>
      this.setState({
        product: res.body
      })
    );
  }

  renderImage = () => {
    return this.state.product.image ? (
      <img
        className={s.img}
        src={this.state.product.image}
        alt={this.state.product.title}
      />
    ) : (
      <img className={s.img} src={image} alt={this.state.product.title} />
    );
  };

  renderStockImage = () => {
    return this.state.product.inStock ? (
      <div className={s.image}>{this.renderImage()}</div>
    ) : (
      <div className={s.image}>
        <img className={s.stock} src={img} />
        {this.renderImage()}
      </div>
    );
  };

  render() {
    let { id, title, price, quantity } = this.state.product;
    return (
      <div className={s.wrapper}>
        <Link to="/category/id">
          <Button className={`btn-lg btn-warning ${s.btn}`}>Close</Button>
        </Link>
        <div className={s.product}>
          <div className={s.about}>
            <mark>id: {id}</mark>
            <p>Name: {title}</p>
            <p>Price: {price}$</p>
            <p>Quantity: {quantity}</p>
          </div>
          {this.renderStockImage()}
        </div>
        <CommentList productId={this.props.match.params.id} />
      </div>
    );
  }
}
