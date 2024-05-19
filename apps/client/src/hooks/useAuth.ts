import { ILOGIN } from "@/lib/commonInterface";
import { ROUTES } from "@/lib/routeConstant";
import {
  removeToken,
  removeRefreshToken,
  saveRefreshToken,
  saveToken,
} from "@/lib/storage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeRefreshToken();
    navigate(ROUTES.SIGN_IN);
  };

  const handleLogin = (obj: ILOGIN | null) => {
    const { refreshToken, accessToken } = obj || {};
    if (refreshToken && accessToken) {
      saveToken(accessToken);
      saveRefreshToken(refreshToken);
      navigate(ROUTES.WELCOME);
    }
  };

  return { handleLogout, handleLogin };
}
