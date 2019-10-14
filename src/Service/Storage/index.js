import { locStorage } from "./LocalStorage";
import { cookieStorage } from "./CookieStorage";

export const storage =
  typeof window.localStorage !== "undefined" ? locStorage : cookieStorage;
