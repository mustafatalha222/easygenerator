import { useState } from "react";
import {
  getToken,
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from "@/lib/storage";
import useAuth from "./useAuth";
import { ENDPOINTS } from "@/lib/endpoints";

type IResponse<T> = {
  data: T | null;
  error?: string;
};

interface ApiResponse<T> {
  loading: boolean;
  data: T | null;
  error: string;
  apiCall: (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    options?: RequestInit
  ) => Promise<IResponse<T>>;
}

const baseUrl = import.meta.env.VITE_API_URL;

const useApiCall = <T>(): ApiResponse<T> => {
  const { handleLogout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const refreshAccessToken = async (): Promise<string> => {
    try {
      const refreshToken = getRefreshToken();
      const response = await fetch(`${baseUrl}${ENDPOINTS.REFRESH_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      saveToken(data.accessToken);
      saveRefreshToken(data.refreshToken);

      return data.accessToken;
    } catch (error) {
      handleLogout();
      throw new Error("Session expired. Please log in again.");
    }
  };

  const apiCall = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    options: RequestInit = {}
  ): Promise<IResponse<T>> => {
    let resData: IResponse<T> = { data: null };
    try {
      setLoading(true);

      let token = getToken();
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
      let response = await fetch(`${baseUrl}${url}`, requestOptions);

      if (token && response.status === 401) {
        token = await refreshAccessToken();
        headers.Authorization = `Bearer ${token}`;
        requestOptions.headers = headers; // update headers in requestOptions
        response = await fetch(`${baseUrl}${url}`, requestOptions);
      }
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "An error occurred");
      }
      setData(responseData);
      resData = { data: responseData };
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        resData = { data: null, error: err.message };
      } else {
        const unknownError = "An unknown error occurred";
        setError(unknownError);
        resData = { data: null, error: unknownError };
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
