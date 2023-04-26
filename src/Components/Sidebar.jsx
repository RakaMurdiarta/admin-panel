import React from "react";
import { sidebarItems } from "../constant/ItemSidebar";
import { Link, useLocation } from "react-router-dom";
import { useToggle } from "../context/toggleContext";
import { useHistoryPath } from "../Store/store";
import { useHistory } from "../context/historyPath";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useToggle();
  const { pathname } = useLocation();
  const { historyPath, setHistoryPath } = useHistory();

  // console.log("sidebar", historyPath);
  return (
    <aside
      className={`w-60 ${
        openSidebar ? "translate-x-0" : "-translate-x-48"
      } fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] `}
    >
      <div
        className={`${
          openSidebar ? "translate-x-0" : "translate-x-24 scale-x-0"
        } w-full transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12`}
      >
        <div className="flex pl-4 items-center space-x-2 ">
          <div className="text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-2 py-1 rounded-full text-white  ">
          <div className="transform ease-in-out duration-300 mr-12">Admin</div>
        </div>
      </div>
      {/* click sidebar */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className={`-right-6 transition-all ease-in-out duration-500 flex border-4 border-blue-100 absolute top-3 rounded-full ${
          !openSidebar && `rotate-180`
        } bg-slate-300`}
      >
        <FaArrowAltCircleLeft size={30} />
      </button>
      {/* <!-- MAX SIDEBAR--> */}
      <div
        className={`${
          openSidebar ? "flex" : "hidden"
        } text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]`}
      >
        {sidebarItems &&
          sidebarItems.map((item, i) => {
            const { name, path, icon: Icon } = item;

            return (
              <div
                key={i}
                className={`w-full hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] pl-5 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-4`}
              >
                <div
                  className={`${
                    path === pathname ? "text-blue-500" : "text-white"
                  } flex items-center space-x-4 hover:translate-x-5 transition-all p-4 ease-in-out duration-300`}
                >
                  <Icon size={30} />
                  <div>
                    <Link to={path}>{name}</Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* <!-- MINI SIDEBAR--> */}

      <div
        className={`mini ${
          openSidebar ? "hidden" : "flex"
        } mt-20 flex-col space-y-2 w-full h-[calc(100vh)]`}
      >
        {sidebarItems &&
          sidebarItems.map((item, index) => {
            const { icon: Icon, path } = item;
            return (
              <div
                key={index}
                className="hover:ml-4 justify-end pr-3 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex"
              >
                <Link to={path} onClick={() => setHistoryPath(path)}>
                  <Icon size={25} />
                </Link>
              </div>
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
