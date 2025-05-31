import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between  items-center h-13 lg:h-16 text-white bg-gradient-to-r from-lime-500 to-lime-600  w-full fixed px-5 md:px-5 lg:px-25 py-1.5 shadow-md z-50">
        <div className="flex h-full  items-center ">
          <img
            className="h-full w-10 lg:w-14 object-cover p-2 bg-white rounded-2xl shadow-md"
            src="https://cdn-icons-png.flaticon.com/512/4564/4564089.png"
            alt=""
          />
          <ul className="hidden gap-5 ml-10 text-lg font-medium text-neutral-200 lg:flex">
            <Link
              to="/home"
              className="transition duration-500 ease-in-out hover:text-white hover:scale-105"
            >
              {" "}
              <li>Home</li>{" "}
            </Link>
            <Link
              to="/chat"
              className="transition duration-500 ease-in-out hover:text-white hover:scale-105"
            >
              <li>Chat</li>
            </Link>
          </ul>
        </div>
        <div className="hidden lg:flex items-center w-full justify-end ">
          {localStorage.getItem("user") ? (
            <button
              onClick={() => handleLogout()}
              className=" bg-white text-lime-600 px-4 py-1 rounded hover:bg-lime-100 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="bg-white text-lime-600 px-4 py-1 rounded hover:bg-lime-100 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
        <div
          className={`lg:flex fixed lg:static top-12 right-0 w-full lg:w-auto bg-gradient-to-r from-lime-500 to-lime-600 text-white transition-transform duration-300 ease-in-out lg:bg-transparent lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          <ul className="flex flex-col gap-5 p-5 text-lg lg:hidden lg:flex-row lg:p-0">
            <Link to="/home" onClick={toggleMenu}>
              <li>Home</li>{" "}
            </Link>
            <Link to="/chat" onClick={toggleMenu}>
              <li>Chat</li>
            </Link>
          </ul>
          <div className="flex flex-col gap-5 pb-5 pl-5 text-lg lg:hidden lg:flex-row lg:p-0">
            {localStorage.getItem("user") ? (
              <button
                onClick={() => handleLogout()}
                className=" bg-white text-lime-600 px-4 py-1 w-30 rounded hover:bg-lime-100 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleLogin()}
                className="bg-white text-lime-600 px-4 py-1 w-30 rounded hover:bg-lime-100 transition cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          {isOpen ? (
            <IoClose className="text-3xl" onClick={toggleMenu} />
          ) : (
            <HiMiniBars3BottomRight className="text-2xl" onClick={toggleMenu} />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
