import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card } from "./Card";
import { actionDeleteProduct } from "../../Store/Action";
import { getProducts } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    products: getProducts(state)
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
