import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = ({ children }) => {
  const location = useLocation();
  const { auth } = useAuth();

  if (!auth?.token) {
    //cara saya
    return (
      <Navigate to={"/login"} state={{ path: location.pathname }} replace />
    );
    //cara pak adi kirim state tambahan ketika akses route yang private
    // return <Navigate to={"/login"} state={{path:location.pathname}} />;
  }

  return children;
};

export default Auth;
