import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <section className="py-10 px-20 h-[67vh]">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5 flex sm:py-8">
        <div className="flex flex-wrap items-center sm:-mx-3 justify-center">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">
                <span className="block text-indigo-600 xl:inline uppercase">
                  welcome to my page
                </span>
              </h1>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                {auth.user ? (
                  <button className="p-3 animate-bounce bg-transparent text-2xl rounded-lg font-medium border-4">
                    Feel Free to Explore
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login", {
                        state: { path: location.pathname },
                        replace: true,
                      });
                    }}
                    className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                  >
                    GET STARTED
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
              <img src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePages;
