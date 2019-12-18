import { all } from "redux-saga/effects";
import { categorySaga } from "./Category/saga";

export function* rootSaga() {
  yield all([categorySaga()]);
}
