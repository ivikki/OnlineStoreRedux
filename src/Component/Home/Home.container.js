import { connect } from "react-redux";
import { Home } from "./Home";
import { getUser } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    user: getUser(state)
  };
}

export default connect(mapStateToProps)(Home);
