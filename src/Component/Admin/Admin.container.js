import { connect } from "react-redux";
import { Admin } from "./Admin";

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Admin);
