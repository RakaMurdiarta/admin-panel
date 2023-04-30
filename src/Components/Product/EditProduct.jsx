import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useInterceptersAxios from "../../hooks/useIntercepterAxiosPrivate";
const EditProduct = () => {
  const axiosPrivate = useInterceptersAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState({
    price: "",
    title: "",
    desc: "",
    id: 0,
    image: "",
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(`/admin/product/${id}`, {
          signal: controller.signal,
        });

        const { data } = response.data;

        {
          mounted &&
            setSingleProduct((prev) => {
              return {
                ...prev,
                id: data._id,
                title: data.title,
                price: data.price,
                image: data.imageUrl,
                desc: data.description,
              };
            });
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("first");
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handlefile = (e) => {
    // e.target.files && e.target.files.length > 0 ?
    setFile(e.target.files[0]);
    // : null;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const fileUpload = new FormData();
    console.log(file);
    file && fileUpload.append("image", file);
    fileUpload.append("title", singleProduct.title);
    fileUpload.append("price", singleProduct.price);
    fileUpload.append("description", singleProduct.desc);

    // console.log(fileUpload.get("image"));

    try {
      const response = await axiosPrivate.post(
        `/admin/product/${id}`,
        fileUpload
      );
      !response
        ? console.log(response)
        : navigate("/products", {
            state: { path: location.pathname },
            replace: true,
          });
    } catch (error) {
      console.log("from fetch edit product", error);
    }
  };

  return (
    <section class="p-6 mx-auto rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold text-center pb-8 text-[#252525] capitalize">
        Edit Product
      </h1>
      <div className="grid gap-8 mt-5 sm:grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <img
            className="flex-1 w-full h-full rounded-lg object-cover"
            src={
              file
                ? URL.createObjectURL(file)
                : `http://localhost:8000/${singleProduct.image}`
            }
            alt={singleProduct.title}
          />
          <label
            className="flex-2 bg-indigo-300 text-base p-2 rounded-lg hover:bg-indigo-400 transition-all duration-200 ease-out text-[#252525] font-semibold cursor-pointer text-center"
            htmlFor="filebtn"
          >
            Upload Image
          </label>
          <input
            onChange={(e) => handlefile(e)}
            id="filebtn"
            type="file"
            name="image"
            className="hidden"
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-2 flex-col flex-2 text-sm px-8 py-4 shadow-inner rounded-lg"
        >
          <label className="mt-3" htmlFor="id">
            Id Product
          </label>
          <input
            id="id"
            name="id"
            className="w-full text-xs py-2 border rounded-lg px-3 outline-none shadow-inner"
            type="text"
            disabled
            value={singleProduct.id}
          />
          <label className="mt-3" htmlFor="title">
            Product Name
          </label>
          <input
            onChange={(e) => {
              setSingleProduct((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            id="title"
            name="title"
            className="w-full py-2 text-xs border rounded-lg px-3 outline-none shadow-inner"
            type="text"
            value={singleProduct.title}
          />
          <label className="mt-3" htmlFor="price">
            Price
          </label>
          <input
            onChange={(e) => {
              setSingleProduct((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
            id="price"
            name="price"
            className="w-full py-2 text-xs border rounded-lg px-3 outline-none shadow-inner"
            type="number"
            value={singleProduct.price}
          />
          <label className="mt-3" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={(e) => {
              setSingleProduct((prev) => {
                return { ...prev, desc: e.target.value };
              });
            }}
            value={singleProduct.desc}
            name="desc"
            id="description"
            cols={40}
            rows={6}
            className="py-2 border resize-none text-[13px] rounded-lg px-3 outline-none shadow-inner"
          ></textarea>
          <div className="flex gap-10 mt-5 justify-center items-center">
            <button className="border py-2 px-10 rounded-lg bg-indigo-300  hover:bg-indigo-400 transition-all duration-200 ease-out text-base  text-[#252525] font-semibold">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
