import React from "react";
import { FaUsers } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { useUserContext } from "../context/userContext";
import { UseProducts } from "../context/productContext";
import LineChart from "../Components/LineChart";

const Dashboard = () => {
  const { users } = useUserContext();
  const { products } = UseProducts();

  return (
    <section>
      <div className="grid grid-cols-3 gap-3 text-white">
        <div className="p-5 bg-yellow-500 rounded-xl shadow-lg">
          <div className="text-xl font-extrabold uppercase">Users</div>
          <div className="flex justify-between items-center ml-3 mt-3">
            <FaUsers size={60} />
            <div className="font-extrabold text-2xl">{`${users.length} active`}</div>
          </div>
        </div>
        <div className="p-5 border rounded-xl bg-indigo-700 shadow-xl">
          <div className="text-xl font-extrabold uppercase">Products</div>
          <div className="flex justify-between items-center ml-3 mt-3">
            <RiShoppingCartFill size={60} />
            <div className="font-extrabold text-2xl">{`${products.length} active`}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 my-10 gap-2">
        <div className="p-3 border"></div>
        <div className="border">
          <LineChart />
        </div>
        <div className="border">
          <LineChart />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
