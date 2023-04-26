import React from "react";
import Users from "./Pages/Users";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import ConfirmDeleteModal from "./Components/ConfirmDeleteModal";
import Auth from "./Components/Auth";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PersitLogin from "./Components/PersitLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* {private route} */}
        <Route element = {<PersitLogin/>}>
        <Route
          path="users"
          element={
            <Auth>
              <Users />
            </Auth>
          }
        />
        <Route
          path="products"
          element={
            <Auth>
              <Products />
            </Auth>
          }
        />
        </Route>

        {/* {public Route} */}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
};

export default App;
