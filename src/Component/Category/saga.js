import { all, takeEvery, call, put } from "redux-saga/effects";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR
} from "../../Store/Action/Type";
import {
  actionGetCategoriesSuccess,
  actionGetCategories,
  actionShowMessage
} from "../../Store/Action/Action";
import { API } from "../../Service/API";

function* getCategories() {
  let res = yield call(API.getCategories);
  if (res.status === 200) {
    yield put(actionGetCategoriesSuccess(res.body.content));
  }
}

function* addCategory({ name, slug, parentId }) {
  let res = yield call(API.addCategory, name, slug, parentId);
  if (res.status === 200) {
    yield put(actionShowMessage("Success. Category added"));
    yield put(actionGetCategories());

    // let selectKey = this.state.selectKey++;
    // this.setState({
    //   selectKey,
    //   errors: {}
    // });
  } else {
    yield put({ type: ADD_CATEGORY_ERROR, payload: res.body.errors });
  }
}

export function* categorySaga() {
  yield all([
    takeEvery(GET_CATEGORIES, getCategories),
    takeEvery(ADD_CATEGORY, addCategory)
  ]);
}
