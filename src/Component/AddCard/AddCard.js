import React from "react";
import s from "./AddCard.module.css";
import { AddCardForm } from "./AddCardForm";

export class AddCard extends React.Component {
  state = {
    errors: {}
  };

  addProduct = values => {
    let product = {
      category: values.category ? { id: values.category.value } : null,
      title: values.title,
      price: parseInt(values.price),
      quantity: parseInt(values.quantity),
      image: values.image,
      inStock: values.status
    };
    this.props.addProductEvent(product).then(res => {
      if (res.status === 200) {
        this.setState({
          errors: {}
        });
      } else {
        this.setState({
          errors: res.body.errors
        });
      }
    });
  };

  handleSubmit = values => {
    console.log(values);
    this.addProduct(values);
  };

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.modal}>
          <h2 className="text-center">Add Product</h2>
          <AddCardForm
            onSubmit={this.handleSubmit}
            addCategory={this.addCategory}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}
