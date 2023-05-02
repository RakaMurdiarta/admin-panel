import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

const Authorization = () => {
  const { auth } = useAuth();

  return !auth.token ? <h1>Your Not Authorization for this page , please login</h1> : <Outlet />;
};

export default Authorization;
