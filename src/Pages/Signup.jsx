import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

  const onSubmit = (data) => {
    console.log(data)
    axios
      .post("http://localhost:8000/auth/signup", data)
      .then((result) => {
        // console.log(result?.response?.data?.message);
        alert("berhasil register");
        reset();
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      });
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ x: -10000 }}
        animate={{ x: 0 }}
        exit={{ x: -10000 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center"
      >
        <div className="md:w-1/2 px-5 md:px-10">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <div className="relative">
              <input
                className="p-2 mt-8 rounded-xl border w-full"
                type="text"
                name="name"
                placeholder="Username"
                {...register("name", {
                  required: { value: true, message: "field must be required" },
                })}
              />

              {errors.name ? (
                <p className="text-[12px] py-1 px-2 text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="email"
                name="email"
                placeholder="username@gmail.com"
                {...register("email", {
                  required: { value: true, message: "field must be required" },
                })}
              />
              {errors.email ? (
                <p className="text-[12px] py-1 px-2 text-red-500">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "field must be required" },
                })}
              />
              {errors.password ? (
                <p className="text-[12px] py-1 px-2 text-red-500">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>
          <div className="mt-8 text-xs flex justify-evenly items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Signup;
