import { COOKIE_KEYS } from "@/lib/storage";
import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  const accessToken = Cookies.get(COOKIE_KEYS.TOKEN);
  const refreshToken = Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
  return !!accessToken || !!refreshToken;
};
