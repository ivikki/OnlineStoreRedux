import axios from "axios";
import { storage } from "../Storage";
import { store } from "../../Store/Config";
import {
  ACCESS_TOKEN,
  AUTH_STORE,
  REFRESH_TOKEN,
  AUTH_BEARER,
  AUTH_HEADER
} from "../../Constant";
import { actionUserLogin } from "../../Store/Action";

const API_BASE = process.env.REACT_APP_API_BASE;

const http = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.response.use(
  res => res,
  error =>
    isLogged() && error.response.status === 401
      ? handlerRefreshSession(error)
      : prepareError(error)
);

class APIRequest {
  async tryRestoreSession() {
    try {
      let res = await http.get("/user/me");
      store.dispatch(actionUserLogin(res.data));
    } catch (e) {
      if (isLogged()) {
        alert("Session Expired");
      }
    }
  }

  async login(email, password) {
    let result = {};

    try {
      let res = await http.post("/auth/login", { email, password });
      result.status = res.status;
      result.body = res.data;

      saveSession(res.data.token);
    } catch (e) {
      result.status = e.response.status;
      result.body = e.response.data;
    }

    return result;
  }

  async getProducts({ size, page } = {}) {
    let url = "/product/list?sort=id,desc";
    if (size) {
      url += "&size=" + size;
    }

    if (page) {
      url += "&page=" + page;
    }

    let response = await http.get(url);

    return {
      status: response.status,
      body: response.data
    };
  }

  async getProduct(id) {
    let response = await http.get("/product/" + id);

    return {
      status: response.status,
      body: response.data
    };
  }

  async addProduct(product) {
    let response = await http.post("/product/", product);

    return {
      status: response.status,
      body: response.data
    };
  }

  async deleteProduct(id) {
    return await http.delete("/product/" + id);
  }

  async editProduct(id, product) {
    let response = await http.put("/product/" + id, product);

    return {
      status: response.status,
      body: response.data
    };
  }
}

function saveSession({ accessToken, refreshToken }) {
  storage.set(AUTH_STORE, {
    [ACCESS_TOKEN]: accessToken,
    [REFRESH_TOKEN]: refreshToken
  });

  http.defaults.headers[AUTH_HEADER] = AUTH_BEARER + accessToken;
}

function getSession() {
  return storage.get(AUTH_STORE);
}

function isLogged() {
  return getSession() !== null;
}

async function refreshSession() {
  let refreshToken = getSession()[REFRESH_TOKEN];

  delete http.defaults.headers[AUTH_HEADER];
  let res = await http.post("/auth/refresh-token", { refreshToken });

  saveSession(res.data.token);

  return res;
}

async function handlerRefreshSession(error) {
  try {
    let res = await refreshSession();

    error.config.headers[AUTH_HEADER] =
      AUTH_BEARER + res.data.token[ACCESS_TOKEN];

    return await http(error.config);
  } catch (e) {
    return prepareError(error);
  }
}

function prepareError(error) {
  return Promise.reject(error);
}

export const API = new APIRequest();
