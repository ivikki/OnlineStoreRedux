import { connect } from "react-redux";
import { Comment } from "./Comment";
import { bindActionCreators } from "redux";
import { actionAddComment } from "../../Store/Action";

function mapDispatchToProps(dispatch) {
  return {
    addCommentEvent: bindActionCreators(actionAddComment, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
