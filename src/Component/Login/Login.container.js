import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionShowError, actionClearStore } from "../../Store/Action";
import { Login } from "./Login";

const mapDispatchToProps = dispatch => ({
  showErrorEvent: bindActionCreators(actionShowError, dispatch),
  clearStoreEvent: bindActionCreators(actionClearStore, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
