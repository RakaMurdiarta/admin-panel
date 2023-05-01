import React from "react";
import { FaUsers } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { useUserContext } from "../context/userContext";
import { UseProducts } from "../context/productContext";
import LineChart from "../Components/LineChart";
import Barchart from "../Components/Barchart";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { users } = useUserContext();
  const { products } = UseProducts();
  const location = useLocation();

  return (
    <section>
      <div className="grid grid-cols-6 gap-2 ">
        <div className="col-span-4">
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
          <div className="grid grid-cols-3 my-7 gap-7">
            <div className="col-span-3 bg-green-300 text-white p-6 rounded-xl shadow-xl">
              <div className="mb-6 text-lg font-semibold">User Growth</div>
              <LineChart />
            </div>
            <div className="col-span-3 bg-gray-300 text-stone-800 p-6 rounded-xl shadow-xl">
              <div className="mb-6 text-lg font-semibold">
                Product Range Price
              </div>
              <Barchart />
            </div>
          </div>
        </div>
        <div className="col-span-2 overflow-hidden rounded-lg">
          <div className="flex flex-col gap-8">
            <div className="p-4 rounded-lg bg-gray-50 shadow-lg overflow-hidden">
              <div className="text-xs font-medium flex justify-between">
                <p>Recent user</p>
                <Link
                  to={"/users"}
                  state={{ path: location.pathname }}
                  replace={true}
                  className="text-blue-500"
                >
                  See all
                </Link>
              </div>
              <hr className="mt-1.5 border" />
              <div className="py-3 overflow-auto">
                <table className="text-xs table table-auto rounded-md overflow-hidden">
                  <thead className="bg-lime-600 rounded-lg text-white">
                    <tr>
                      <th className=" w-20 p-3 ">No </th>
                      <th className=" w-52 p-3 ">email</th>
                      <th className=" w-40 p-3 ">name </th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {users.slice(0, 5).map((user, index) => {
                      return (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
                          }`}
                        >
                          <td className="p-4 whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className="p-4 whitespace-nowrap ">
                            {user.email}
                          </td>
                          <td className="p-4 whitespace-nowrap text-center">{user.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 shadow-lg overflow-hidden">
              <div className="text-xs font-medium flex justify-between">
                <p>Recent Products</p>
                <Link
                  to={"/products"}
                  state={{ path: location.pathname }}
                  replace={true}
                  className="text-blue-500"
                >
                  See all
                </Link>
              </div>
              <div className="py-3 overflow-auto">
                <table className="text-xs table table-auto rounded-lg overflow-hidden">
                  <thead className="bg-indigo-800 rounded-lg text-white">
                    <tr>
                      <th className="w-20 p-3 ">No </th>
                      <th className="w-52 p-3 ">Product Name</th>
                      <th className="w-40 p-3 ">Price </th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {products.slice(0, 8).map((product, index) => {
                      return (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
                          }`}
                        >
                          <td className="p-4 whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <Link
                              to={`/product/${product._id}`}
                              className="text-blue-800 font-medium cursor-pointer hover:underline"
                            >
                              {product.title}
                            </Link>
                          </td>
                          <td className="p-4 whitespace-nowrap text-center">
                            {"Rp." + product.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
