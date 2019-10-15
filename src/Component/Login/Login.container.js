import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionShowError } from "../../Store/Action";
import { Login } from "./Login";

const mapDispatchToProps = dispatch => ({
  showErrorEvent: bindActionCreators(actionShowError, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
