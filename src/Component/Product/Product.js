import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import img from "./stock.png";
import avatar from "./avatar.png";
import image from "./no-image-300x450.jpg";
import s from "./Product.module.css";
import { API } from "../../Service/API";

export class Product extends React.Component {
  state = {
    product: [],
    textComment: "",
    errors: [],
    comments: [],
    answerComment: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    API.getProduct(id).then(res =>
      this.setState({
        product: res.body
      })
    );
    API.getComment(id).then(res => {
      this.setState({
        comments: res.body.content
      });
    });
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

  sandComment = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const text = this.state.textComment;
    this.props.addCommentEvent(id, text).then(res => {
      if (res.status === 200) {
        let comments = this.state.comments.slice();
        comments.push({
          text,
          id: res.body.id,
          user: this.props.user,
          date: res.body.date
        });
        this.setState({
          textComment: "",
          comments
        });
      } else {
        this.setState({
          errors: res.body.errors.text
        });
      }
    });
  };

  sandAnswerComment = e => {
    e.preventDefault();
    this.setState({
      answerComment: true
    });
  };

  sandTextComment = e => {
    let textComment = e.target.value;
    this.setState({
      textComment
    });
  };

  showError() {
    if (this.state.errors.length > 0) {
      return (
        <div className="alert alert-danger">
          {this.state.errors.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
      );
    }

    return null;
  }

  clearErrors = () => {
    this.setState({
      errors: []
    });
  };

  showComment() {
    if (this.state.comments.length > 0) {
      return (
        <div>
          <h4>Comments</h4>
          {this.state.comments.map(el => (
            <div key={el.id} className={s.comment}>
              <div className={s.author}>
                <img
                  className={s.avatar}
                  src={el.user.picture !== null ? el.user.picture : avatar}
                  alt="avatar"
                />
                <div className={s.author_date}>
                  <p>{el.user.firstName + " " + el.user.lastName}</p>
                  <p className="font-italic font-weight-normal">
                    {new Date(Date.parse(`${el.date}`)).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className={s.comment_text}>{el.text}</p>
              {this.state.answerComment ? this.renderForm() : null}
              <Button
                className={`btn-warning ${s.btn_answer}`}
                onClick={this.sandAnswerComment}
              >
                Answer
              </Button>
            </div>
          ))}
        </div>
      );
    }

    return <h4>No comments. Be the first.</h4>;
  }

  renderForm = () => {
    return (
      <form className={s.form} onFocus={this.clearErrors}>
        <h4>Add comment</h4>
        <textarea
          className="form-control"
          placeholder="Enter your comment..."
          value={this.state.textComment}
          onChange={this.sandTextComment}
        />
        {this.showError()}
        <Button
          className={`btn-warning ${s.btn_sand}`}
          onClick={this.sandComment}
        >
          Sand comment
        </Button>
      </form>
    );
  };

  render() {
    return (
      <div className={s.wrapper}>
        <Link to="/">
          <Button className={`btn-lg btn-warning ${s.btn}`}>Close</Button>
        </Link>
        <div className={s.product_wrapper}>
          <div className={s.product}>
            <div className={s.about}>
              <mark>id: {this.state.product.id}</mark>
              <p>Name: {this.state.product.title}</p>
              <p>Price: {this.state.product.price}$</p>
              <p>Quantity: {this.state.product.quantity}</p>
            </div>
            {this.renderStockImage()}
          </div>
          {this.showComment()}
          {this.renderForm()}
        </div>
      </div>
    );
  }
}
