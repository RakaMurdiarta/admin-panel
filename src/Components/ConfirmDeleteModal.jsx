import React, { useEffect, useRef } from "react";
import { useUserContext } from "../context/userContext";
import { useToggle } from "../context/toggleContext";
import {useAnimateIndex} from "../Store/store";

const ConfirmDeleteModal = () => {
  const { deleteUser, singleUserId } = useUserContext();
  const { setOpenDeleteModal, openDeleteModal } = useToggle();
  const ConfirmRef = useRef();
  const setselectedIndex = useAnimateIndex((state) => state.setSelectedIndex);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        openDeleteModal &&
        ConfirmRef.current &&
        !ConfirmRef.current.contains(e.target)
      ) {
        setOpenDeleteModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openDeleteModal]);

  return (
    <div
      ref={ConfirmRef}
      id="modal-id"
      className={`fixed inset-0 z-50 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <div className="relative transition transform ease-out duration-1000 border w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] h-auto p-5 bg-white rounded-lg">
          <div className="text-center font-semibold text-3xl py-3">
            <h1>Are You Sure Want Delete?</h1>
          </div>
          <div className="flex items-center justify-center gap-10 text-sm font-medium my-8">
            <button
              onClick={() => {
                setselectedIndex(singleUserId);
                deleteUser(singleUserId);
                setOpenDeleteModal(false);
              }}
              className="p-3 transition-all ease-in duration-300 hover:scale-105 bg-green-700 text-white hover:bg-green-500 w-28 rounded-xl"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="p-3 transition-all ease-in duration-300 hover:scale-105 bg-red-700 text-white hover:bg-red-500 w-28 rounded-xl"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
