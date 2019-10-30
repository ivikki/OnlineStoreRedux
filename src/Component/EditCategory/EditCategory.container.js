import { connect } from "react-redux";
import { EditCategory } from "./EditCategory";
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
)(EditCategory);
