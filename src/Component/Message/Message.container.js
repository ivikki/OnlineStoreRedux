import { connect } from "react-redux";
import { Message } from "./Message";
import { bindActionCreators } from "redux";
import { actionClearMessageError } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    error: state.error,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearMessageErrorEvent: bindActionCreators(
      actionClearMessageError,
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
