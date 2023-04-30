import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../api/Axios";
const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await Axios.get("/auth/logout", {
        withCredentials: true,
      });
      navigate("/login", { state: { path: location.pathname }, replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
