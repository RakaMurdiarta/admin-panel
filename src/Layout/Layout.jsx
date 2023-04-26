import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useToggle } from "../context/toggleContext";
import EditUserModal from "../Components/EditUserModal";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import AddUserForm from "../Components/AddUserForm";
import AddProduct from "../Components/Product/AddProduct";

const Layout = () => {
  const {
    openSidebar,
    openEditModal,
    openDeleteModal,
    openAddUserModal,
    openAddProductModal,
  } = useToggle();

  const location = useLocation();

  return (
    <section>
      {openEditModal && <EditUserModal />}
      {openDeleteModal && <ConfirmDeleteModal />}
      {openAddUserModal && <AddUserForm />}
      {openAddProductModal && <AddProduct />}

      {/* Header */}
      <Navbar />
      {/* <!-- open sidebar button --> */}
      <Sidebar />
      {/* <!-- CONTENT --> */}
      <div
        className={`content ${
          openSidebar ? "ml-12 lg:ml-60" : "ml-12"
        } transform ease-in-out duration-1000 pt-20 px-2 md:px-5 pb-4`}
      >
        <nav className="flex px-5 py-3 text-gray-700 rounded-lg bg-gray-50 dark:bg-[#1E293B] ">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center capitalize">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  to="/users"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {location.pathname.slice(1)}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        {/* Main Content */}
        <main className="my-5 mx-2">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Layout;
