import React from "react";
import { Card } from "../Card";
import s from "./ProductList.module.css";
import Modal from "../Modal/Modal.container";

export class ProductList extends React.Component {
  componentDidMount() {
    this.changePage(this.props.pageNumber);
  }

  changePage = page => {
    this.props.getProductsEvent({ size: this.props.size, page });
  };

  deleteCallback = res => {
    if (res.status === 200) {
      this.changePage(this.props.pageNumber);
    }
  };

  getClassName(num) {
    return this.props.pageNumber === num ? s.page + " " + s.active : s.page;
  }

  renderPagesNumber = () => {
    if (this.props.totalPages > 1) {
      return (
        <ul className={s.pages}>
          {[...Array(this.props.totalPages).keys()].map(el => (
            <li
              key={el}
              className={this.getClassName(el)}
              onClick={() => this.changePage(el)}
            >
              {el + 1}
            </li>
          ))}
        </ul>
      );
    }
  };

  renderCards = () => {
    return this.props.products.length > 0 ? (
      <div>
        <div className={s["wrapper-card"]}>
          {this.props.products.map(el => (
            <Card
              product={el}
              key={el.id}
              deleteCallback={this.deleteCallback}
              isAdmin={this.props.isAdmin}
            />
          ))}
        </div>
        {this.renderPagesNumber()}
      </div>
    ) : (
      <div className="h3">No Products. Is empty</div>
    );
  };

  render() {
    return (
      <div className={s.wrapper}>
        {this.props.error != null || this.props.message != null ? (
          <Modal />
        ) : null}
        {this.renderCards()}
      </div>
    );
  }
}
