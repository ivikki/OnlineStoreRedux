import { connect } from "react-redux";
import { Admin } from "./Admin";
import { getUser } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    user: getUser(state)
  };
}

export default connect(mapStateToProps)(Admin);
