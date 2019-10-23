import React from "react";
import { Button } from "../Button";
import s from "./CommentList.module.css";
import { API } from "../../Service/API";
import { Comment } from "../Comment";

export class CommentList extends React.Component {
  state = {
    textComment: "",
    errors: [],
    comments: []
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const id = this.props.productId;
    API.getComment(id).then(res => {
      this.setState({
        comments: res.body.content
      });
    });
  };

  addComment = e => {
    e.preventDefault();
    const id = this.props.productId;
    const text = this.state.textComment;
    this.props.addCommentEvent(id, text).then(res => {
      if (res.status === 200) {
        let comments = this.state.comments.slice();
        comments.push({
          text,
          id: res.body.id,
          user: this.props.user,
          date: res.body.date,
          childs: []
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

  addTextComment = e => {
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

  showAllComments = comments => {
    return comments.map(el => (
      <div key={el.id} className={s.comment_wrapper}>
        <Comment
          comment={el}
          commentId={el.id}
          productId={this.props.productId}
          getComments={this.getComments}
        />
        {el.childs.length > 0 ? this.showAllComments(el.childs) : null}
      </div>
    ));
  };

  showComment = () => {
    return this.state.comments.length > 0 ? (
      <div className={s.comment}>
        <h4>Comments</h4>
        {this.showAllComments(this.state.comments)}
      </div>
    ) : (
      <div className={s.comment}>
        <h4>No comments. Be the first</h4>
      </div>
    );
  };

  render() {
    return (
      <div className={s.comment_list}>
        {this.showComment()}
        <form className={s.form} onFocus={this.clearErrors}>
          <h4>Add comment</h4>
          <textarea
            maxLength="300"
            className="form-control"
            placeholder="Enter your comment..."
            value={this.state.textComment}
            onChange={this.addTextComment}
          />
          {this.showError()}
          <Button
            className={`btn-warning ${s.btn_sand}`}
            onClick={this.addComment}
          >
            Send comment
          </Button>
          <span className={s.counter}>
            left:
            {300 - this.state.textComment.length}
          </span>
        </form>
      </div>
    );
  }
}
