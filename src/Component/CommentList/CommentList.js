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
    const id = this.props.productId;
    API.getComment(id).then(res => {
      console.log(res.body.content);
      this.setState({
        comments: res.body.content
      });
    });
  }

  sandComment = e => {
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
            <Comment
              comment={el}
              key={el.id}
              commentId={el.id}
              productId={this.props.productId}
            />
          ))}
          {/*{this.state.comments.map(el =>*/}
          {/*el.childs.length > 0 ? (*/}
          {/*<Comment*/}
          {/*comment={el}*/}
          {/*key={el.id}*/}
          {/*commentId={el.id}*/}
          {/*productId={this.props.productId}*/}
          {/*/>*/}
          {/*) : null*/}
          {/*)}*/}
        </div>
      );
    }

    return <h4>No comments. Be the first.</h4>;
  }

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
            onChange={this.sandTextComment}
          />
          {this.showError()}
          <Button
            className={`btn-warning ${s.btn_sand}`}
            onClick={this.sandComment}
          >
            Send comment
          </Button>
        </form>
      </div>
    );
  }
}
