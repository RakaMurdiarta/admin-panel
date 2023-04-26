import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  // const user = JSON.parse(localStorage.getItem("user"));
  console.log(auth, "kdabdabd,dbS");
  return (
    <header
      className={`fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-between h-16 pl-10`}
    >
      <div className="logo ml-12 dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
        Admin Panel
      </div>
      {/* <!-- SPACER --> */}
      <div className="h-full flex items-center justify-center"></div>
      <div className="flex-none h-full text-center flex items-center justify-center">
        <div className="flex space-x-3 items-center px-3">
          <div className="flex-none flex justify-center">
            {!auth.user ? (
              <div className="flex gap-2 text-white font-medium">
                <Link to={'/login'} className="px-3 py-1 border border-white bg-transparent rounded-lg hover:bg-blue-900 hover:scale-105 transition-all duration-100 hover:border-none">
                  signin
                </Link>
                <Link to={'/register'} className="px-3 py-1 border border-white bg-transparent rounded-lg hover:bg-blue-900 hover:scale-105 transition-all duration-100 hover:border-none">
                  signup
                </Link>
              </div>
            ) : null}
          </div>
          {auth.user && (
            <div className="flex text-white justify-center items-center gap-2">
              <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
                Welcome {auth.user}
              </div>
              <div className="h-10 w-10 flex flex-1">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="shadow rounded-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
