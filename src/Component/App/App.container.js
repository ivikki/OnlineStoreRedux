import { connect } from "react-redux";
import { App } from "./App";
import { bindActionCreators } from "redux";
import { actionAppInit } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    appIsInit: state.appIsInit
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
