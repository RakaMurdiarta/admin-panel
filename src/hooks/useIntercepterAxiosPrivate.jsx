import { axiosPrivate } from "../api/Axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthContext";
import useLogout from "./useLogout";

const useInterceptersAxios = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const logout = useLogout();

  useEffect(() => {
    console.log("intecepter run");
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => {
        console.log(error, "interceptor request");
        Promise.reject(error);
      }
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        if (error.response?.status === 403 && !prevRequest?.sent) {
          console.log("403 intercepter");
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["authorization"] = `Bearer ${newToken}`;

          return axiosPrivate(prevRequest);
        }

        if (error.response?.status === 408) {
          console.log("408 error");
          const action = await logout();
          return action;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useInterceptersAxios;
