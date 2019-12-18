import { connect } from "react-redux";
import { Category } from "./Category";
import { bindActionCreators } from "redux";
import {
  actionShowMessage,
  actionGetCategories,
  actionAddCategory
} from "../../Store/Action";
import { getCategories, getCategoryErrors } from "../../Store/Selector";

function mapStateToProps(state) {
  return {
    categories: getCategories(state),
    errors: getCategoryErrors(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showMessageEvent: bindActionCreators(actionShowMessage, dispatch),
    getCategories: bindActionCreators(actionGetCategories, dispatch),
    addCategory: bindActionCreators(actionAddCategory, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
