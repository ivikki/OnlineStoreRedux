import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ProductList } from "./ProductList";
import { actionGetProducts } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    products: state.products,
    size: state.size,
    totalPages: state.totalPages,
    pageNumber: state.pageNumber
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductsEvent: bindActionCreators(actionGetProducts, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
