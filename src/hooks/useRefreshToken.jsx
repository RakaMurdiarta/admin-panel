import { useAuth } from "../context/AuthContext";
import Axios from "../api/Axios";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log(auth, "sdsd");
    const response = await Axios.get("admin/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log("prev", prev);

      return {
        ...prev,
        user: response.data.user,
        token: response.data.token,
        id: response.data.id,
      };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
