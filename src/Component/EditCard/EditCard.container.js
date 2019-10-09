import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EditCard } from "./EditCard";
import { actionEditProduct } from "../../Store/Action";

function mapStateToProps(state) {
  return {
    products: state.products,
    pageNumber: state.pageNumber
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
