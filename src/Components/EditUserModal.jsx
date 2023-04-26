import React, { useEffect, useRef, useState } from "react";
import { useToggle } from "../context/toggleContext";
import { useUserContext } from "../context/userContext";
import axios from "axios";

const EditUserModal = () => {
  const modalRef = useRef("");
  const { openEditModal, setOpenEditModal } = useToggle();
  const { fetcher, singleUserId, setUsers } = useUserContext();

  const [singleUser, setSingleUser] = useState({ _id: "", email: "" });
  const [name, setName] = useState("");

  const getUser = (id) => {
    axios.get(`http://localhost:8000/admin/user/${id}`).then((response) => {
      setSingleUser(response.data.user);
      setName(response.data.user.name);
    });
  };

  useEffect(() => {
    if (openEditModal === true) {
      getUser(singleUserId);
    }
  }, [openEditModal]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        openEditModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setOpenEditModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openEditModal]);

  const onSubmitUpdate = async (e) => {
    e.preventDefault();

    if (name === singleUser.name) {
      alert("Tidak Ada Yang Berubah");
      return;
    }
    if (!name.replace(/\s/g, "").length) {
      alert(
        "string only contains whitespace (ie. spaces, tabs or line breaks)"
      );
      return;
    }
    const response = await axios.post(
      "http://localhost:8000/admin/update/user",
      {
        name,
        id: singleUserId,
      }
    );

    setOpenEditModal(false);
    setUsers(response.data.data);
  };
  return (
    <div
      id="modal-id"
      ref={modalRef}
      className={`fixed inset-0 z-50 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <div className="relative transition transform ease-out duration-1000 border w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] h-auto p-5 bg-white rounded-lg">
          <h1 className="py-4 tracking-wide font-medium text-center text-xl">
            Update User
          </h1>
          <div className="flex flex-col space-y-3">
            <form onSubmit={onSubmitUpdate}>
              <div className="mb-2 space-y-2 ">
                <label htmlFor="id">User Id</label>
                <br />
                <input
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="text"
                  value={singleUser?._id}
                  name="id"
                  disabled
                />
              </div>
              <div className="mb-2 space-y-2">
                <label htmlFor="id">Name</label>
                <br />
                <input
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2 space-y-2">
                <label htmlFor="id">Email</label>
                <br />
                <input
                  className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                  type="text"
                  disabled
                  value={singleUser?.email}
                  name="email"
                />
              </div>
              <div className="text-center flex justify-center items-center gap-8 pt-8 pb-2">
                <div className="p-3 border rounded-lg w-24 bg-green-500 bg-opacity-80">
                  <button className="text-white text-sm">Oke</button>
                </div>
                <div className="p-3 border rounded-lg w-24">
                  <button
                    className="text-gray-800 text-sm"
                    onClick={() => setOpenEditModal(false)}
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

export default EditUserModal;
