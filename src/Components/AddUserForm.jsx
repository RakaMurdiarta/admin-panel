import React, { useRef } from "react";
import { useToggle } from "../context/toggleContext";
import useInterceptersAxios from "../hooks/useIntercepterAxiosPrivate";


const AddUserForm = () => {
  const { openAddUserModal, setOpenAddUserModal } = useToggle();
  const axiosPrivate = useInterceptersAxios()
  
  const addUserRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    // if (!nameRef.current.value.replace(/\s/g, "").length) {
    //   alert(
    //     "string only contains whitespace (ie. spaces, tabs or line breaks)"
    //   );
    //   return;
    // }
    console.log({
    //   name: nameRef.current.value,
    //   email: emailRef.current.value,
    //   pass: passRef.current.value,
    hehe : !nameRef.current.value.replace(/\s/g, "").length
    });
  };
  return (
    <div ref={addUserRef} className={`fixed inset-0 z-50 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <div className="relative transition transform ease-out duration-1000 border w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] h-auto p-5 bg-white rounded-lg">
          <h1 className="py-4 tracking-wide font-medium text-center text-xl">
            Add User
          </h1>
          <div className="flex flex-col space-y-3">
            <form onSubmit={onSubmit}>
              <div className="mb-2 space-y-2 ">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  ref={nameRef}
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="text"
                  name="name"
                />
              </div>

              <div className="mb-2 space-y-2">
                <label htmlFor="id">Email</label>
                <br />
                <input
                  ref={emailRef}
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="text"
                  name="email"
                />
              </div>
              <div className="mb-2 space-y-2">
                <label htmlFor="id">Password</label>
                <br />
                <input
                  ref={passRef}
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="password"
                  name="password"
                />
              </div>
              <div className="text-center flex justify-center items-center gap-8 pt-8 pb-2">
                <div className="p-3 border rounded-lg w-24 bg-green-500 bg-opacity-80">
                  <button className="text-white text-sm">Oke</button>
                </div>
                <div className="p-3 border rounded-lg w-24">
                  <button
                    className="text-gray-800 text-sm"
                    onClick={() => setOpenAddUserModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
