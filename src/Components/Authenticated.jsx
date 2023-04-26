import React from "react";
import { UseProducts } from "../context/productContext";

const Authenticated = ({ error }) => {
  return (
    <section>
      <div className="flex justify-center items-center w-fit">{error}</div>
    </section>
  );
};

export default Authenticated;
