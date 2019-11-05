import { connect } from "react-redux";
import { Message } from "./Message";
import { bindActionCreators } from "redux";
import { actionClearMessageError } from "../../Store/Action";
import { getError, getMessage } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    error: getError(state),
    message: getMessage(state)
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
