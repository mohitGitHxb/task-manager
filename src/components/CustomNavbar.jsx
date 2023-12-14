"use client";
import UserContext from "@/app/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const doLogout = async () => {
    try {
      const data = await logout();
      if (data) {
        context.setUser(null);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error while logging out");
      toast.error("Logout Error");
    }
  };
  return (
    <nav className="bg-green-600 h-16 py-2 px-36 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="#!">Work Manager</a>
        </h1>
      </div>
      {context?.user && (
        <div>
          <ul className="flex space-x-5">
            <li>
              <Link href={"/"} className="hover:text-green-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/add-task" className="hover:text-green-200">
                Add Task
              </Link>
            </li>
            <li>
              <Link href={"/show-tasks"} className="hover:text-green-200">
                Show Tasks
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div>
        <ul className="flex space-x-3">
          {context.user && (
            <>
              <li>
                <Link href={"#!"}>{context?.user?.name}</Link>
              </li>
              <li>
                <button type="button" onClick={doLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!context.user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
