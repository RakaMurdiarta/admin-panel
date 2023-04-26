import Axios from "../api/Axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { useAuth } from "./AuthContext";
import useInterceptersAxios from "../hooks/useIntercepterAxiosPrivate";
import axios from "axios";

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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { auth } = useAuth();

  const getProducts = () => {
    axiosPrivate
      .get("/admin/products")
      .then((respone) => {
        const { data } = respone.data;
        setLoading(true);
        setProducts(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);

        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      });
  };

  let mounted = true;
  useEffect(() => {
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
    await axios.get(`http://localhost:8000/admin/del/${id}`);
    getProducts();
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
