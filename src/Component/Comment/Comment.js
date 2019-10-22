import React from "react";
import { Button } from "../Button";
import avatar from "./avatar.png";
import s from "./Comment.module.css";

export class Comment extends React.Component {
  state = {
    answerComment: false,
    errors: [],
    textAnswerComment: ""
  };

  componentDidMount() {
    document.addEventListener("click", this.shadowClick);
  }

  componentWillMount() {
    document.removeEventListener("click", this.shadowClick);
  }

  stopPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  showAnswerComment = e => {
    this.stopPropagation(e);
    e.preventDefault();

    this.setState({
      answerComment: true
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

  shadowClick = () => {
    this.setState({
      answerComment: false
    });
  };

  sandTextAnswerComment = e => {
    let textAnswerComment = e.target.value;
    this.setState({
      textAnswerComment
    });
  };

  sandAnswerComment = e => {
    e.preventDefault();
    const commentId = this.props.commentId;
    const productId = this.props.productId;
    const text = this.state.textAnswerComment;
    this.props.addCommentEvent(productId, text, commentId).then(res => {
      if (res.status !== 200) {
        this.setState({
          errors: res.body.errors.text
        });
      }
    });
  };

  clearErrors = () => {
    this.setState({
      errors: []
    });
  };

  renderForm = () => {
    return (
      <form
        className={s.form}
        onClick={this.stopPropagation}
        onFocus={this.clearErrors}
      >
        <h4>Add comment</h4>
        <textarea
          maxLength="300"
          autoFocus
          className="form-control"
          placeholder="Enter your comment..."
          value={this.state.textAnswerComment}
          onChange={this.sandTextAnswerComment}
        />
        {this.showError()}
        <Button
          className={`btn-warning ${s.btn_sand}`}
          onClick={this.sandAnswerComment}
        >
          Send comment
        </Button>
      </form>
    );
  };

  renderComments = () => {
    console.log("childs", this.props.comment.childs);
    this.props.comment.childs.map(el => {
      return (
        <div className={s.comment}>
          {el.text}
          {/*<div className={s.author}>*/}
          {/*<img*/}
          {/*className={s.avatar}*/}
          {/*src={el.user.picture !== null ? el.user.picture : avatar}*/}
          {/*alt="avatar"*/}
          {/*/>*/}
          {/*<div className={s.author_date}>*/}
          {/*<p>{el.user.firstName + " " + el.user.lastName}</p>*/}
          {/*<p className="font-italic font-weight-normal">*/}
          {/*{new Date(Date.parse(`${el.date}`)).toLocaleString()}*/}
          {/*</p>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<p className={s.comment_text}>{el.text}</p>*/}
          {/*<Button*/}
          {/*className={`btn-warning ${s.btn_answer}`}*/}
          {/*onClick={this.showAnswerComment}*/}
          {/*>*/}
          {/*Answer*/}
          {/*</Button>*/}
          {/*{this.state.answerComment ? this.renderForm() : null}*/}
        </div>
      );
    });
  };

  render() {
    return (
      <div className={s.comment}>
        <div className={s.author}>
          <img
            className={s.avatar}
            src={
              this.props.comment.user.picture !== null
                ? this.props.comment.user.picture
                : avatar
            }
            alt="avatar"
          />
          <div className={s.author_date}>
            <p>
              {this.props.comment.user.firstName +
                " " +
                this.props.comment.user.lastName}
            </p>
            <p className="font-italic font-weight-normal">
              {new Date(
                Date.parse(`${this.props.comment.date}`)
              ).toLocaleString()}
            </p>
          </div>
        </div>
        <p className={s.comment_text}>{this.props.comment.text}</p>
        {this.props.comment.childs.length > 0 ? this.renderComments() : null}
        <Button
          className={`btn-warning ${s.btn_answer}`}
          onClick={this.showAnswerComment}
        >
          Answer
        </Button>
        {this.state.answerComment ? this.renderForm() : null}
      </div>
    );
  }
}
