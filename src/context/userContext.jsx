import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import useInterceptersAxios from "../hooks/useIntercepterAxiosPrivate";
import { useAuth } from "./AuthContext";
import Axios from "../api/Axios";

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
      Axios.get("/admin/users", {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
        .then((respone) => {
          const { data } = respone.data;
          console.log(data);
          isMounted && setUsers(data);
          setError("");
        })
        .catch((err) => {
          console.log(err);
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
      .then((respone) => {
        fetcher();
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
