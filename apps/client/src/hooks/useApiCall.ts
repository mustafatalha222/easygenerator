import { useState } from "react";
import { GET_TOKEN, LOCALSTORAGE } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/routeConstant";

type IResponse = { body: object | null; errors?: { message: string } };
interface ApiResponse<T> {
  loading: boolean;
  data: T | null;
  error: string;
  apiCall: (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    options?: RequestInit
  ) => Promise<IResponse>;
}

const useApiCall = <T>(): ApiResponse<T> => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const LogoutUser = () => {
    localStorage.removeItem(LOCALSTORAGE.TOKEN);
    navigate(ROUTES.SIGN_IN);
  };

  const apiCall = async (
    url: string,
    method: string,
    data?: object,
    options: RequestInit = {}
  ): Promise<IResponse> => {
    let resData = { body: null };
    try {
      setLoading(true);

      const token = GET_TOKEN();
      const headers: Record<string, string> = {
        ...((options.headers as Record<string, string>) || {}),
        "Content-Type": "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const requestOptions: RequestInit = {
        ...options,
        method,
        headers,
      };

      if (["POST", "PUT"].includes(method)) {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        requestOptions
      );
      const responseData = await response.json();
      if (responseData.errors) {
        if (responseData.errors.status === 401) LogoutUser();
        setError(responseData.errors?.message || responseData.errors);
        clearError();
      } else {
        setData(responseData.body);
      }
      resData = responseData.body;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      clearError();
    } finally {
      setLoading(false);
    }
    return resData;
  };

  return { loading, data, error, apiCall };
};

export default useApiCall;
