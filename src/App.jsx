import React from "react";
import Users from "./Pages/Users";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Auth from "./Components/Auth";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PersitLogin from "./Components/PersitLogin";
import Authorization from "./Components/Authorization";
import Orders from "./Pages/Orders";
import Dashboard from "./Pages/Dashboard";
import HomePages from "./Pages/HomePages";
import Categories from "./Pages/Categories";
import EditProduct from "./Components/Product/EditProduct";
import Addproduct2 from "./Components/Product/Addproduct2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* {private route} */}
        <Route path="/" element={<HomePages />} />

        <Route element={<PersitLogin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<EditProduct />} />
          <Route path="product/newproduct" element={<Addproduct2 />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* {public Route} */}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
};

export default App;
