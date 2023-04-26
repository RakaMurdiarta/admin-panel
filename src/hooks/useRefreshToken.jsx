import { useAuth } from "../context/AuthContext";
import Axios from "../api/Axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await Axios.get("admin/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      // console.log("prev", prev);
      // console.log(response.data.token);
      return { ...prev, token: response.data.token };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
