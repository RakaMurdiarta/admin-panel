import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import useInterceptersAxios from "../hooks/useIntercepterAxiosPrivate";
import { useAuth } from "./AuthContext";
import Axios, { axiosPrivate } from "../api/Axios";
import { BiError, BiErrorCircle } from "react-icons/bi";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [singleUserId, setSingleUserId] = useState("");
  const [userLogin, setUserLogin] = useState({
    user: "",
    token: "",
  });

  // const axiosPrivate = useInterceptersAxios();
  const [error, setError] = useState("");
  const { auth } = useAuth();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetcher = () => {
      axiosPrivate
        .get("/admin/users", {
          signal: controller.signal,
        })
        .then((respone) => {
          const { data } = respone.data;

          isMounted && setUsers(data);
          setError("");
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
        });
    };

    fetcher();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth]);

  const deleteUser = (userid) => {
    axios
      .post("http://localhost:8000/admin/delete/user", { id: userid })
      .then((response) => {
        setUsers(response.data.data);
      });
  };

  return (
    <UserContext.Provider
      value={{
        deleteUser,
        users,
        setUsers,
        singleUserId,
        setSingleUserId,
        userLogin,
        setUserLogin,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
