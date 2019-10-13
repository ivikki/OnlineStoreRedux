import { connect } from "react-redux";
import { Modal } from "./Modal";
import { bindActionCreators } from "redux";
import { actionClearStore } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    error: state.error,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionClearStoreEvent: bindActionCreators(actionClearStore, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
