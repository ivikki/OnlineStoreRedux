import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card } from "./Card";
import { actionDeleteProduct } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProductEvent: bindActionCreators(actionDeleteProduct, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
