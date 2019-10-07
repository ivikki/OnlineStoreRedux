import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import img from "./stock.png";
import image from "./no-image-300x450.jpg";
import s from "./Product.module.css";
import { API } from "../../API";

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
    return (
      <div className={s.wrapper}>
        <Link to="/">
          <Button className={`btn-lg btn-warning ${s.btn}`}>Close</Button>
        </Link>
        {console.log("product", this.state.product.image)}
        <div className={s.product}>
          <div className={s.about}>
            <mark>id: {this.state.product.id}</mark>
            <p>Name: {this.state.product.title}</p>
            <p>Price: {this.state.product.price}$</p>
            <p>Quantity: {this.state.product.quantity}</p>
          </div>
          {this.renderStockImage()}
        </div>
      </div>
    );
  }
}
