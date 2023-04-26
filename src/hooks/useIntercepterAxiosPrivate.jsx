import { axiosPrivate } from "../api/Axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthContext";

const useInterceptersAxios = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log('intecepter run')
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["authorization"]) {
          console.log('set headers')

          config.headers["authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;
        

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("jwt expired");
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["authorization"] = `Bearer ${newToken}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [auth,refresh]);

  return axiosPrivate;
};

export default useInterceptersAxios;
