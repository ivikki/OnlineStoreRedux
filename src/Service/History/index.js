import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function redirect(path) {
  history.push(path);
}
