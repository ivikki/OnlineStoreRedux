import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CommentList } from "./CommentList";
import { actionAddComment } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCommentEvent: bindActionCreators(actionAddComment, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);
