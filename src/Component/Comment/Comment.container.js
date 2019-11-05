import { connect } from "react-redux";
import { Comment } from "./Comment";
import { bindActionCreators } from "redux";
import { actionAddComment } from "../../Store/Action";
import { getUser } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    user: getUser(state)
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
)(Comment);
