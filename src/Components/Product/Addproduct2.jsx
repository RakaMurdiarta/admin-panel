import React, { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import useInterceptersAxios from "../../hooks/useIntercepterAxiosPrivate";
import { Link } from "react-router-dom";

const Addproduct2 = () => {
  const [file, setFile] = useState(null);
  const [dataform, setDataform] = useState({
    price: "",
    title: "",
    desc: "",
  });

  const axiosPrivate = useInterceptersAxios();
  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const ADDPRODUCT_URL = "/admin/addproduct";
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("price", dataform.price);
    formData.append("description", dataform.desc);
    formData.append("title", dataform.title);
    formData.append("image", file);

    try {
      const response = await axiosPrivate.post(ADDPRODUCT_URL, formData);
      if (!response) {
        return console.log(response);
      }

      setDataform({
        price: "",
        title: "",
        desc: "",
      });
      setFile(null);
    } catch (error) {
      console.log("from addproduct", error);
    }
  };
  return (
    <section className="p-6 mx-auto rounded-lg shadow-md">
      <Link to={'/products'} className="p-3 bg-indigo-500 text-white rounded-lg"> back to products</Link>
      <h1 class="text-2xl font-semibold text-center pb-8 text-[#252525] capitalize">
        Add Product
      </h1>
      <div>image</div>
      <article className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          {file ? (
            <img
              className="flex-1 w-full h-full rounded-lg object-cover"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          ) : (
            <div className="mt-1 w-full h-full flex-1 border-2 border-gray-300 border-dashed rounded-md">
              <div className="flex text-sm text-gray-600 justify-center items-center h-full w-full">
                <label
                  for="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 opacity-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 text-center"
                >
                  <RiImageAddFill className="text-center mx-auto" size={80} />

                  <span className="">Upload a file</span>
                </label>
              </div>
            </div>
          )}
          {file && (
            <>
              <label className="text-center p-2 cursor-pointer focus:ring-2 bg-indigo-500 text-white w-40 mx-auto rounded-lg" htmlFor="file-upload">Change Image</label>
            </>
          )}
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              handleImage(e);
            }}
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-2 flex-col flex-2 text-sm px-8 py-4 shadow-inner rounded-lg"
        >
          <label className="mt-3" htmlFor="title">
            Product Name
          </label>
          <input
            onChange={(e) => {
              setDataform((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            id="title"
            name="title"
            className="w-full py-2 text-xs border rounded-lg px-3 outline-none shadow-inner"
            type="text"
            value={dataform.title}
          />
          <label className="mt-3" htmlFor="price">
            Price
          </label>
          <input
            onChange={(e) => {
              setDataform((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
            id="price"
            name="price"
            className="w-full py-2 text-xs border rounded-lg px-3 outline-none shadow-inner"
            type="number"
            value={dataform.price}
          />
          <label className="mt-3" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={(e) => {
              console.log("first");
              setDataform((prev) => {
                return { ...prev, desc: e.target.value };
              });
            }}
            value={dataform.desc}
            name="desc"
            id="description"
            cols={40}
            rows={6}
            className="py-2 border resize-none text-[13px] rounded-lg px-3 outline-none shadow-inner"
          ></textarea>
          <div className="flex gap-10 mt-5 justify-center items-center">
            <button className="border py-2 px-10 rounded-lg bg-indigo-500 focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:bg-indigo-400 transition-all duration-200 ease-out text-base  text-white font-semibold">
              Add Product
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Addproduct2;
