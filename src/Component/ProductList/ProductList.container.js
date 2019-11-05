import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ProductList } from "./ProductList";
import { actionGetProducts } from "../../Store/Action";
import {
  getPageNumber,
  getProducts,
  getSize,
  getTotalPages,
  getUser
} from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    size: getSize(state),
    totalPages: getTotalPages(state),
    pageNumber: getPageNumber(state),
    user: getUser(state)
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
