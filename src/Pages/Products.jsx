import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UseProducts } from "../context/productContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useFilter } from "../context/filterProduct";
import Authenticated from "../Components/Authenticated";
import { useToggle } from "../context/toggleContext";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const {
    products,
    getProducts,
    deleteProduct,
    getSingleProduct,
    singleProduct,
    editProduct,
    setEditProduct,
    isLoading,
    error,
  } = UseProducts();
  const refresh = useRefreshToken();

  const { auth } = useAuth();

  const { setOpenAddProductModal } = useToggle();

  const { filterProduct, setFilterProduct } = useFilter();
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    price: "",
  });

  const handleFilter = () => {
    let tempProduct = [...products];
    if (searchFilter.name) {
      tempProduct = tempProduct.filter((set) => {
        return set.title
          .toLowerCase()
          .includes(searchFilter.name.toLowerCase());
      });
    }

    if (searchFilter.price) {
      tempProduct = tempProduct.filter((set) => {
        if (searchFilter.price === "Less then 500000") {
          return parseInt(set.price) < 500000;
        }
        if (searchFilter.price === "Greater then 1000000") {
          return parseInt(set.price) > 1000000;
        }

        // return searchFilter.price < parseInt(set.price);
      });
    }

    return tempProduct;
  };

  useEffect(() => {
    setFilterProduct(handleFilter());
  }, [searchFilter.name, searchFilter.price]);

  if (error) {
    return <Authenticated error={error} />;
  }

  return (
    <>
      <div className="flex items-center justify-between mx-2 my-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div>
            <input
              onChange={(e) => {
                setSearchFilter((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="outline-none border py-2 w-56 rounded-md pl-2 text-sm"
              type="text"
              placeholder="Search Products Name"
            />
          </div>
          <div>
            <select
              onChange={(e) => {
                setSearchFilter((prev) => ({ ...prev, price: e.target.value }));
              }}
              className="border py-2 rounded-md w-auto px-2 bg-slate-200 text-sm"
            >
              <option value="">Filter Price:</option>
              <option value="Less then 500000">Less than Rp.500.000</option>
              <option value="Greater then 1000000">
                Greater then Rp.1.000.000
              </option>
            </select>
            {/* <input
              onChange={(e) => {
                setSearchFilter((prev) => ({ ...prev, price: e.target.value }));
              }}
              className="outline-none border py-2 w-56 rounded-md pl-2 text-sm"
              type="number"
              placeholder="Search Products Price"
            /> */}
          </div>
        </div>
        <button
          onClick={() => {
            setOpenAddProductModal(true);
          }}
          className="bg-green-600 p-2 rounded-md w-40 text-white text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <IoMdAddCircleOutline size={25} />
            <p>Add Product</p>
          </div>
        </button>
      </div>
      {/* {Versi Desktop} */}
      <div
        className={`rounded-lg shadow hidden md:block text-left overflow-auto`}
      >
        <table className="table-auto w-full">
          <thead className="bg-[#1E293B] text-white border-gray-400">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                No
              </th>
              <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Photo
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Product Name
              </th>
              <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>

              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              filterProduct?.map((p, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="text-xs px-3 py-5 whitespace-nowrap">
                        <div className="p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                      <td className="text-xs px-3 py-5 whitespace-nowrap">
                        <div className="p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                      <td className="text-xs px-3 py-5 w-24">
                        <div className="min-w-[50px] max-w-[70px] h-[40px] shadow-lg object-cover p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                      <td className="text-xs px-3 py-5 ">
                        <div className="p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                      <td className="text-xs px-3 py-5 ">
                        <div className="p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                      <td className="text-xs px-3 py-5 whitespace-nowrap">
                        <div className="p-2 m-3 animate-pulse bg-slate-300 rounded-md"></div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <AnimatePresence>
                {filterProduct?.length > 0 &&
                  filterProduct?.map((product, index) => {
                    const {
                      _id: id,
                      price,
                      title,
                      imageUrl,
                      description,
                    } = product;

                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -1000,
                        }}
                        transition={{ delay: index * 0.01 }}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <td className="text-xs px-3 py-5 whitespace-nowrap">
                          {index + 1}
                        </td>

                        <td className="text-xs px-3 py-5 whitespace-nowrap">
                          {id}
                        </td>
                        <td className="text-xs px-3 py-5 w-40">
                          <div className="mx-auto">
                            <img
                              className="rounded min-w-[50px] max-w-[70px] h-auto shadow-lg object-cover"
                              src={`http://localhost:8000/${imageUrl}`}
                              alt={title}
                            />
                          </div>
                        </td>
                        <td className="text-xs px-3 py-5">
                          <div className="flex flex-col">
                            <h1 className="text-sm font-medium">{title}</h1>
                            <article className="text-gray-500 whitespace-normal w-72 text-justify">
                              {description}
                            </article>
                          </div>
                        </td>
                        <td className="text-sm px-3 py-5 whitespace-nowrap">
                          {"Rp." + price}
                        </td>

                        <td className="text-xs p-3 py-5 whitespace-nowrap">
                          <div className="flex justify-center items-center gap-3">
                            <button
                              onClick={() => {
                                // setSingleUserId(id);
                                // setOpenEditModal(true);
                              }}
                              id="button-edit"
                              className="p-1.5 hover:bg-green-700 hover:text-white transition-all ease-linear duration-300 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-40"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteProduct(id);
                              }}
                              className="p-1.5 text-xs hover:bg-red-700 hover:text-white transition-all ease-linear duration-300 font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
      {/* {Versi Mobile} */}
      {/* <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:hidden">
        <AnimatePresence>
          {products &&
            products
              // .filter((filteruser) => {
              //   const userFilter = filteruser.name
              //     .toLowerCase()
              //     .includes(searchFilter.toLowerCase());
              //   return userFilter;
              // })
              .map((product, index) => {
                const { _id: id, price, title , imageUrl } = product;
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -1400 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex space-x-5 sm:space-x-3 justify-center items-center sm:items-start sm:justify-start">
                      <div className="flex flex-1 justify-center sm:max-w-[60px] sm:min-w-[60px]">
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          className=" bg-slate-200 rounded-full object-cover "
                        />
                      </div>

                      <div className="flex flex-col flex-1 gap-1">
                        <div className="text-sm text-gray-700 ">{name}</div>
                        <div className="text-blue-500 font-bold hover:underline text-xs cursor-pointer">
                          {email}
                        </div>

                        <div className="flex gap-3 justify-start items-center pt-2">
                          <button
                            onClick={() => {
                              setSingleUserId(id);
                              setOpenEditModal(true);
                            }}
                            className="p-1.5 hover:bg-green-700 hover:text-white transition-all ease-linear duration-300 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-40"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSingleUserId(id);
                              setOpenDeleteModal(true);
                            }}
                            className="p-1.5 text-xs hover:bg-red-700 hover:text-white transition-all ease-linear duration-300 font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-40"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </div> */}
    </>
  );
};

export default Products;
