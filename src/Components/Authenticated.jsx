import React from "react";
import { UseProducts } from "../context/productContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Authenticated = ({ error }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-[65vh] flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry you are not have access to this page
          </p>
          <p className="mb-8 mt-3">
            But dont worry, you can find plenty of other things on our app.
          </p>

          <button
            onClick={() => {
              navigate("/login", {
                state: { path: location.pathname },
                replace: true,
              });
            }}
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
          >
            back to login
          </button>
        </div>
        <div className="max-w-lg"> </div>
      </div>
    </div>
  );
};

export default Authenticated;
