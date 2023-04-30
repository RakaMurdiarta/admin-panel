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
      <div className="grid grid-cols-4 gap-2 ">
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-3 text-white">
            <div className="p-5 bg-yellow-500 rounded-xl shadow-lg">
              <div className="text-xl font-extrabold uppercase">Users</div>
              <div className="flex justify-between items-center ml-3 mt-3">
                <FaUsers size={60} />
                <div className="font-extrabold text-2xl">{`${users.length} active`}</div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-indigo-700 shadow-xl">
              <div className="text-xl font-extrabold uppercase">Products</div>
              <div className="flex justify-between items-center ml-3 mt-3">
                <RiShoppingCartFill size={60} />
                <div className="font-extrabold text-2xl">{`${products.length} active`}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 my-7 gap-6">
            <div className="col-span-3 bg-green-300 text-white p-6 rounded-xl shadow-xl">
              <div className="mb-6 text-lg font-semibold">User Growth</div>
              <LineChart />
            </div>
            <div className="col-span-3 bg-gray-300 text-stone-800 p-6 rounded-xl shadow-xl">
              <div className="mb-6 text-lg font-semibold">User Growth</div>
              <LineChart />
            </div>
          </div>
        </div>
        <div className="border col-span-1"> fajfkaf</div>
      </div>
    </section>
  );
};

export default Dashboard;
