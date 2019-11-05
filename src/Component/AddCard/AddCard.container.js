import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AddCard } from "./AddCard";
import { actionAddProduct } from "../../Store/Action";
import { getProducts, getPageNumber } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    pageNumber: getPageNumber(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProductEvent: bindActionCreators(actionAddProduct, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
