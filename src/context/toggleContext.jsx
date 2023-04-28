import { createContext, useContext, useState } from "react";

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isLoading, setLoading] = useState(false);

  return (
    <ToggleContext.Provider
      value={{
        openEditModal,
        setOpenEditModal,
        openDeleteModal,
        setOpenDeleteModal,
        openSidebar,
        setOpenSidebar,
        openAddUserModal,
        setOpenAddUserModal,
        openAddProductModal,
        setOpenAddProductModal,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};
