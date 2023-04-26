import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersitLogin = () => {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    !auth?.token ? verifyToken() : setLoading(false)
  }, []);

  useEffect(()=>{
    console.log(loading)
    console.log(`AT : ${auth.token}`)
  },[loading])

  return <>
    {loading ?<h1>Loading .... </h1> : <Outlet/>}
  </>;
};

export default PersitLogin;
