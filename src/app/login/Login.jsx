"use client";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";
const validateInputs = (data, prop) => {
  if (data[prop].trim() === "" || data[prop] == null) {
    toast.warning(`${prop} is required !!`, {
      position: "top-center",
    });
    return false;
  }
  return true;
};
const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const context = useContext(UserContext);
  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    console.log(loginData);
    for (let key in loginData) {
      if (validateInputs(loginData, key) === false) {
        return;
      }
    }

    //valid data
    //login

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");
      //redirect
      context.setUser(result);
      router.push("/show-tasks");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 ">
        <div className="py-5"></div>

        <h1 className="text-3xl text-center">Login Here </h1>

        <form action="#!" onSubmit={loginFormSubmitted}>
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2 ps-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              id="user_email"
              name="user_email"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>
          {/* password */}
          <div className="mt-3">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2 ps-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              placeholder="Enter here"
              id="user_password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>

          <div className="mt-3 text-center">
            <button
              type="submit"
              className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
            >
              Login
            </button>
            <button
              type="button"
              className="px-3 py-2 bg-orange-600 ms-3 rounded hover:bg-orange-400"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {/* {JSON.stringify(loginData)} */}
    </div>
  );
};

export default Login;
