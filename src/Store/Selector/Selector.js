export function getProducts(state) {
  return state.app.products;
}

export function getAppIsInit(state) {
  return state.app.appIsInit;
}

export function getUser(state) {
  return state.app.user;
}

export function getSize(state) {
  return state.app.size;
}

export function getPageNumber(state) {
  return state.app.pageNumber;
}

export function getTotalPages(state) {
  return state.app.totalPages;
}

export function getError(state) {
  return state.app.error;
}

export function getMessage(state) {
  return state.app.message;
}

export function getCategories(state) {
  return state.category.categories;
}

export function getCategoryErrors(state) {
  return state.category.errors;
}
