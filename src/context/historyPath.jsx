import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const HistoryPathContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [historyPath, setHistoryPath] = useState("");
  const location = useLocation();

  console.log(historyPath);

  return (
    <HistoryPathContext.Provider value={{ historyPath, setHistoryPath }}>
      {children}
    </HistoryPathContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryPathContext);
};
