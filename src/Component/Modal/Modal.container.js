import { connect } from "react-redux";
import { Modal } from "./Modal";
import { bindActionCreators } from "redux";
import { actionClearError, actionClearMessage } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    error: state.error,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionClearErrorEvent: bindActionCreators(actionClearError, dispatch),
    actionClearMessageEvent: bindActionCreators(actionClearMessage, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
