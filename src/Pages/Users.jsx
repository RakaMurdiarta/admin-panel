import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useToggle } from "../context/toggleContext";
import { useAnimateIndex } from "../Store/store";
import Authenticated from "../Components/Authenticated";

const Users = () => {
  const { users, fetcher, setSingleUserId, error } = useUserContext();
  const [searchFilter, setSearchFilter] = useState("");
  const selectedIndex = useAnimateIndex((state) => state.selectedIndex);
  

  const {
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    setOpenAddUserModal,
  } = useToggle();

  if (error) {
    return <Authenticated error={error} />;
  }

  return (
    <>
      <div className="flex items-center justify-between mx-2 my-4">
        <div>
          <input
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
            className="outline-none border py-2 w-56 rounded-md pl-2 text-sm"
            type="text"
            placeholder="Search Name"
          />
        </div>
        {/* <button
          onClick={() => {
            setOpenAddUserModal(true);
          }}
          className="bg-green-600 p-2 rounded-md w-32 text-white text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <IoMdAddCircleOutline size={25} />
            <p>Add User</p>
          </div>
        </button> */}
      </div>
      {/* {Versi Desktop} */}
      <div
        className={`rounded-lg shadow hidden md:block text-left overflow-hidden`}
      >
        <table className="table-auto w-full">
          <thead className="bg-[#1E293B] text-white border-gray-400">
            <tr>
              <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                No
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-lef">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users &&
                users
                  .filter((filteruser) => {
                    const userFilter = filteruser.name
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase());
                    return userFilter;
                  })
                  .map((user, index) => {
                    const { _id: id, email, name } = user;
                    return (
                      <motion.tr
                        key={index}
                        initial={{ x: -100 }}
                        animate={{ x: selectedIndex === id ? -1400 : 0 }}
                        exit={{
                          x: selectedIndex === id ? 0 : -1400,
                          transition: {
                            duration: 0.4,
                          },
                        }}
                        transition={{ delay: index * 0.1 }}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <td className="text-xs px-3 py-5 whitespace-nowrap">
                          {index + 1}
                        </td>

                        <td className="text-xs px-3 py-5 whitespace-nowrap">
                          {id}
                        </td>
                        <td className="text-xs px-3 py-5 whitespace-nowrap flex items-center gap-3">
                          <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white uppercase">
                            {name[0]}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="text-blue-700 cursor-pointer font-medium">
                              {email}
                            </div>
                            <div className="text-gray-400 lowercase">
                              {name}
                            </div>
                          </div>
                        </td>
                        <td className="text-xs p-3 py-5 whitespace-nowrap">
                          <div className="flex justify-start items-center gap-3">
                            <button
                              onClick={() => {
                                setSingleUserId(id);
                                setOpenEditModal(true);
                              }}
                              id="button-edit"
                              className="p-1.5 hover:bg-green-700 hover:text-white transition-all ease-linear duration-300 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-40"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setSingleUserId(id);
                                setOpenDeleteModal(true);
                              }}
                              className="p-1.5 text-xs hover:bg-red-700 hover:text-white transition-all ease-linear duration-300 font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* {Versi Mobile} */}
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:hidden">
        <AnimatePresence>
          {users &&
            users
              .filter((filteruser) => {
                const userFilter = filteruser.name
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase());
                return userFilter;
              })
              .map((user, index) => {
                const { _id: id, email, name } = user;
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -1400 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex space-x-5 sm:space-x-3 justify-center items-center sm:items-start sm:justify-start">
                      <div className="flex flex-1 justify-center sm:max-w-[60px] sm:min-w-[60px]">
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          className=" bg-slate-200 rounded-full object-cover "
                        />
                      </div>

                      <div className="flex flex-col flex-1 gap-1">
                        <div className="text-sm text-gray-700 ">{name}</div>
                        <div className="text-blue-500 font-bold hover:underline text-xs cursor-pointer">
                          {email}
                        </div>

                        <div className="flex gap-3 justify-start items-center pt-2">
                          <button
                            onClick={() => {
                              setSingleUserId(id);
                              setOpenEditModal(true);
                            }}
                            className="p-1.5 hover:bg-green-700 hover:text-white transition-all ease-linear duration-300 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-40"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSingleUserId(id);
                              setOpenDeleteModal(true);
                            }}
                            className="p-1.5 text-xs hover:bg-red-700 hover:text-white transition-all ease-linear duration-300 font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Users;
