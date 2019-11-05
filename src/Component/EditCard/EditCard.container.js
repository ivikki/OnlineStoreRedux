import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EditCard } from "./EditCard";
import { actionEditProduct } from "../../Store/Action";
import { getPageNumber, getProducts } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    pageNumber: getPageNumber(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editProductEvent: bindActionCreators(actionEditProduct, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
