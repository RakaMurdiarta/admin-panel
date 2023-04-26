import { createContext, useContext, useEffect, useState } from "react";
import { UseProducts as useProducts } from "./productContext";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { products } = useProducts();
  const [filterProduct, setFilterProduct] = useState(products);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  return (
    <FilterContext.Provider value={{ filterProduct, setFilterProduct }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilter = () => {
  return useContext(FilterContext);
};
