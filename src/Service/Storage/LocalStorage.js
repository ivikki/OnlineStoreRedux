class LocalStorage {
  set(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  get(key) {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  delete(key) {
    localStorage.removeItem(key);
  }
}

export const locStorage = new LocalStorage();
