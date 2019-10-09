import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AddCard } from "./AddCard";
import { actionAddProduct } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    products: state.products,
    pageNumber: state.pageNumber,
    error: state.error,
    message: state.message
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
