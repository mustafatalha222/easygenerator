import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refresh_token",
};

export const getToken = () => Cookies.get(COOKIE_KEYS.TOKEN);

export const saveToken = (token: string) =>
  Cookies.set(COOKIE_KEYS.TOKEN, token, { expires: 1 });

export const removeToken = () => Cookies.remove(COOKIE_KEYS.TOKEN);

export const getRefreshToken = () => Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);

export const saveRefreshToken = (token: string) =>
  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, token, { expires: 30 });

export const removeRefreshToken = () =>
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);

export const LOCALSTORAGE = {
  TOKEN: "token",
};
