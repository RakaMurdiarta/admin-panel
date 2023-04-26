import { useRef, useState } from "react";
import { useToggle } from "../../context/toggleContext";
import useInterceptersAxios from "../../hooks/useIntercepterAxiosPrivate";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { setOpenAddProductModal } = useToggle();
  const productNameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();
  const ADDPRODUCT_URL = "/admin/addproduct";
  const [file, setFile] = useState(null);
  const [errorPrice, setErrorPrice] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useInterceptersAxios();

  const handleFile = (e) => {
    const fileSet = e.target.files[0];
    setFile(fileSet);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      console.log("Please select a file");
      return;
    }

    const fileUpload = new FormData();
    fileUpload.append("image", file);
    fileUpload.append("price", priceRef.current.value);
    fileUpload.append("title", productNameRef.current.value);
    fileUpload.append("description", descRef.current.value);

    axiosPrivate
      .post(ADDPRODUCT_URL, fileUpload)
      .then((result) => {
        if (result) {
          setErrorPrice("");
          setErrorTitle("");
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.message == "jwt expired" &&
          err.response.status === 403
        ) {
          return navigate("/login", {
            state: { path: location.pathname },
            replace: true,
          });
        }
        const errorValue = JSON.parse(err.response.data.message);
        errorValue?.forEach((obj) => {
          if (obj.param === "price" && obj?.param) {
            setErrorPrice(obj.msg);
          }
          if (obj.param === "title" && obj?.param) {
            setErrorTitle(obj.msg);
          }
        });
      });
  };
  console.log(errorPrice);
  console.log(errorTitle);

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <div className="relative transition transform ease-out duration-1000 border w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] h-auto p-5 bg-white rounded-lg">
          <h1 className="py-4 tracking-wide font-medium text-center text-xl">
            Add Product
          </h1>
          <div className="flex flex-col space-y-3">
            <form onSubmit={onSubmit}>
              <div className="flex gap-2 relative">
                <div className="flex flex-col flex-2">
                  <div className="mb-2 space-y-2 ">
                    <label>Product Name</label>
                    <br />
                    <input
                      ref={productNameRef}
                      className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                      type="text"
                      name="title"
                    />
                    {errorTitle && (
                      <p className="text-red-600 text-xs">{errorTitle}</p>
                    )}
                  </div>

                  <div className="mb-2 space-y-2">
                    <label>Price</label>
                    <br />
                    <input
                      ref={priceRef}
                      className="p-3 w-full text-sm font-medium outline-none border rounded-lg"
                      type="number"
                      name="price"
                    />
                    {errorPrice && (
                      <p className="text-red-600 text-xs">{errorPrice}</p>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-2.5 mb-10 p-1">
                  <p className="text-center">Upload Image</p>

                  <label
                    htmlFor="file-upload"
                    className="z-20 flex flex-col-reverse items-center justify-center w-full h-full flex-grow cursor-pointer shadow-inner rounded-lg border gap-2"
                  >
                    <div className="z-10 text-xs font-light text-center text-gray-500">
                      <input
                        name="image"
                        type="file"
                        id="file-upload"
                        className="ml-5"
                        required
                        onChange={(e) => {
                          handleFile(e);
                        }}
                      />
                    </div>
                    <svg
                      className="z-10 w-8 h-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="mb-2 space-y-2">
                <label htmlFor="id">Description</label>
                <br />
                <textarea
                  className="p-3 w-full h-20 text-xs font-medium outline-none border rounded-lg resize-none"
                  ref={descRef}
                  name="description"
                  id=""
                />
              </div>
              <div className="text-center flex justify-center items-center gap-8 pt-8 pb-2">
                <div className="p-3 border rounded-lg w-24 bg-green-500 bg-opacity-80">
                  <button className="text-white text-sm">Oke</button>
                </div>
                <div className="p-3 border rounded-lg w-24">
                  <button
                    className="text-gray-800 text-sm"
                    onClick={() => setOpenAddProductModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
