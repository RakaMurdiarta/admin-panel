import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { ToggleProvider } from "./context/toggleContext";
import { ProductProvider } from "./context/productContext";
import { AnimatePresence } from "framer-motion";
import FilterProvider from "./context/filterProduct";
import { HistoryProvider } from "./context/historyPath";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimatePresence>
      <BrowserRouter>
        <AuthProvider>
          <HistoryProvider>
            <ToggleProvider>
              <UserProvider>
                <ProductProvider>
                  <FilterProvider>
                    <App />
                  </FilterProvider>
                </ProductProvider>
              </UserProvider>
            </ToggleProvider>
          </HistoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </AnimatePresence>
  </React.StrictMode>
);
