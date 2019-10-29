import { connect } from "react-redux";
import { Category } from "./Category";
import { bindActionCreators } from "redux";
import { actionShowMessage } from "../../Store/Action";

function mapDispatchToProps(dispatch) {
  return {
    showMessageEvent: bindActionCreators(actionShowMessage, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Category);
