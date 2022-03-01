/* eslint-disable no-useless-concat */
import jwtDecode from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
//
import axios from "./axios";
import { LoginForm } from "./sigin";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const expirationDate = decode(accessToken)?.expirationDate;
  const currentTime = Date.now() / 1000;
  return expirationDate ? expirationDate > currentTime : false;
};

const decode = (accessToken: string): LoginForm => {
  return jwtDecode(accessToken);
};

const handleTokenExpired = (exp: any) => {
  let expiredTimer;
  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    console.log("expired");
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    setCookie(accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { expirationDate } = decode(accessToken);
    handleTokenExpired(expirationDate);
  } else {
    deleteCookie();
    // We need to wait half second to reload the page and delete the cookie.
    setTimeout(() => {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }, 500);
    delete axios.defaults.headers.common.Authorization;
  }
};

// Token Section

function setCookie(tokenData: string) {
  let cookieString: string =
    encodeURIComponent("boostAmpReactToken") +
    "=" +
    encodeURIComponent(tokenData) +
    ";";
  // eslint-disable-next-line no-useless-concat
  cookieString += "samesite=" + "Strict" + ";";
  document.cookie = cookieString;
}

function getTokenCookie() {
  const name = encodeURIComponent("boostAmpReactToken");
  let result;
  const regExp: RegExp = getCookieRegExp(name);
  result = regExp.exec(document.cookie);
  if (result && result?.length > 0) {
    return result[1];
  }
  return false;
}

/**
 * Used for get the token cookie with RegExp.
 * @param name Cookie name
 */
function getCookieRegExp(name: string): RegExp {
  // eslint-disable-next-line no-useless-escape
  const escapedName: string = name.replace(
    /([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,
    "\\$1"
  );

  return new RegExp(
    "(?:^" + escapedName + "|;\\s*" + escapedName + ")=(.*?)(?:;|$)",
    "g"
  );
}

/**
 * Validates if a token exist in the cookies.
 * @param name          Cookie name
 * @param defaultValue  The value to return if no cookie is found
 */
function validateToken(): boolean {
  if (getTokenCookie()) {
    return true;
  }
  return false;
}

/**
 * Delete the cookie when we logout from the application.
 */
function deleteCookie() {
  document.cookie =
    "boostAmpReactToken" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export {
  isValidToken,
  decode,
  setSession,
  verify,
  sign,
  setCookie,
  validateToken,
  getTokenCookie,
  getCookieRegExp,
};
