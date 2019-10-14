class CookieStorage {
  set(key, value, days = 9999999) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = key + "=" + (value || "") + expires + "; path=/";
  }

  get(key) {
    let nameEQ = key + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  delete(key) {
    document.cookie = key + "=; Max-Age=-99999999;";
  }
}

export const cookieStorage = new CookieStorage();
