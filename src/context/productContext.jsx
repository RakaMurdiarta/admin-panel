import Axios from "../api/Axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { useAuth } from "./AuthContext";
import useInterceptersAxios from "../hooks/useIntercepterAxiosPrivate";
import useLogout from "../hooks/useLogout";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const axiosPrivate = useInterceptersAxios();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { auth } = useAuth();
  const logout = useLogout();

  const getProducts = async () => {
    try {
      const response = await axiosPrivate.get("/admin/products");
      const { data } = response.data;
      setProducts(data);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getProducts();
    }

    return () => {
      mounted = false;
    };
  }, [auth]);

  const getSingleProduct = async (id) => {
    try {
      const response = await Axios.get(`admin/getproduct/${id}`);
      setSingleProduct(response.data.data);

      setEditProduct((prev) => ({
        ...prev,
        title: response.data.data.title,
        price: response.data.data.price,
        description: response.data.data.description,
      }));

      // return response;
    } catch (error) {
      return console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axiosPrivate.get(`/admin/del/${id}`);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error.response.status, "erererereererr");
      if (error.response.status === 408) {
        return await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
        getSingleProduct,
        singleProduct,
        editProduct,
        setEditProduct,
        isLoading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const UseProducts = () => {
  return useContext(ProductContext);
};
