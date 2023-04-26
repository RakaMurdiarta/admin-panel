const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
            <div className="w-8 h-8 flex ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                alt="profile"
                className="shadow rounded-full object-cover"
              />
            </div>
          </div>

          <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
            {user?.user ?? ""}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
