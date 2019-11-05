import { connect } from "react-redux";
import { App } from "./App";
import { bindActionCreators } from "redux";
import { actionAppInit } from "../../Store/Action";
import { getAppIsInit } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    appIsInit: getAppIsInit(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appInitEvent: bindActionCreators(actionAppInit, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
