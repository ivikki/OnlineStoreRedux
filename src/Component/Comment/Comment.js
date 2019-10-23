import React from "react";
import { Button } from "../Button";
import avatar from "./avatar.png";
import { API } from "../../Service/API";
import s from "./Comment.module.css";

export class Comment extends React.Component {
  state = {
    answerComment: false,
    errors: [],
    textAnswerComment: "",
    isEdit: false,
    textComment: ""
  };

  componentDidMount() {
    document.addEventListener("click", this.shadowClick);
    this.setState({
      textComment: this.props.comment.text
    });
  }

  componentWillMount() {
    document.removeEventListener("click", this.shadowClick);
  }

  stopPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  handleEditComment = e => {
    e.preventDefault();
    this.finishEdit();
    const commentId = this.props.commentId;
    const productId = this.props.productId;
    const text = this.state.textComment;
    const parentId = null;
    console.log(commentId, productId, text, parentId);
    API.editComment(productId, text, commentId, parentId).then(res => {
      if (res.status === 200) {
        this.props.getComments();
      }
    });
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

  addTextAnswerComment = e => {
    let textAnswerComment = e.target.value;
    this.setState({
      textAnswerComment
    });
  };

  addAnswerComment = e => {
    e.preventDefault();
    const commentId = this.props.commentId;
    const productId = this.props.productId;
    const text = this.state.textAnswerComment;
    this.props.addCommentEvent(productId, text, commentId).then(res => {
      if (res.status === 200) {
        this.setState({
          textAnswerComment: ""
        });
        this.props.getComments();
      } else {
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
        <textarea
          maxLength="300"
          autoFocus
          className="form-control"
          placeholder="Enter your comment..."
          value={this.state.textAnswerComment}
          onChange={this.addTextAnswerComment}
        />
        {this.showError()}
        <Button
          className={`btn-warning ${s.btn_sand}`}
          onClick={this.addAnswerComment}
        >
          Send comment
        </Button>
        <span className={s.counter}>
          left:
          {300 - this.state.textAnswerComment.length}
        </span>
      </form>
    );
  };

  handleEdit = () => {
    this.setState({
      isEdit: true
    });
  };

  finishEdit = () => {
    this.setState({
      isEdit: false
    });
  };

  showEditButton = () => {
    if (this.props.user.id === this.props.comment.user.id) {
      return (
        <Button onClick={this.handleEdit} className={`btn-info ${s.btn_edit}`}>
          Edit
        </Button>
      );
    }
    return null;
  };

  saveEditText = e => {
    let editText = e.target.value;
    this.setState({
      textComment: editText
    });
  };

  renderTextComment = () => {
    if (this.state.isEdit) {
      return (
        <div className={s.input_wrapper}>
          <textarea
            maxLength="300"
            autoFocus
            value={this.state.textComment}
            onChange={this.saveEditText}
            className={s.input}
            onBlur={this.handleEditComment}
          />
          <span className={s.counter}>
            left:{300 - this.state.textComment.length}
          </span>
        </div>
      );
    }
    return <p className={s.comment_text}>{this.state.textComment}</p>;
  };

  render() {
    let { user, date } = this.props.comment;
    return (
      <div className={s.comment}>
        <div className={s.author}>
          <img
            className={s.avatar}
            src={user.picture !== null ? user.picture : avatar}
            alt="avatar"
          />
          <div className={s.author_date}>
            <p>{user.firstName + " " + user.lastName}</p>
            <p className="font-italic font-weight-normal">
              {new Date(Date.parse(`${date}`)).toLocaleString()}
            </p>
          </div>
        </div>
        {this.renderTextComment()}
        <Button
          className={`btn-warning ${s.btn_answer}`}
          onClick={this.showAnswerComment}
        >
          Answer
        </Button>
        {this.state.answerComment ? this.renderForm() : null}
        {this.showEditButton()}
      </div>
    );
  }
}
