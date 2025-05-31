import React from "react";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
function Login() {
  const API = "https://6839bc5c6561b8d882b18134.mockapi.io/Users";

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username) {
      setError("Please fill in Username field");
      return;
    }
    if (!user.password) {
      setError("Please fill in Password field");
      return;
    }
    try {
      const response = await axios.get(API);
      const users = response.data;
      const foundUser = users.find((u) => u.username === user.username);
      const foundPassword = users.find((u) => u.password === user.password);

      if (foundUser === undefined) {
        setError("Username not found");
        return;
      }
      if (foundPassword === undefined) {
        setError("Incorrect password");
        return;
      }

      setSuccess("Login successful!");
      localStorage.setItem("user", foundUser.username);
      localStorage.setItem("userId", foundUser.id);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {success}
        </Alert>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
        <div className="hidden md:flex flex-col gap-y-5 items-center justify-center bg-gradient-to-bl from-cyan-400 to-lime-600 text-white h-full w-1/2 rounded-r-4xl">
          <h1 className="text-2xl">Welcome</h1>
          <p className="text-center text-lg w-3/4">
            Welcome back! Please log in to access your personalized space where
            you can manage your favorite characters. Enter your email and
            password to continue your journey!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-100 h-full w-1/2">
          <div className="flex flex-col items-center bg-neutral-150 p-5 gap-5 md:px-10 rounded-lg shadow-md">
            <div className="flex flex-col items-center bg-gradient-to-br from-cyan-400 to-lime-600 rounded-full">
              <RiAccountPinCircleFill className="text-6xl p-2 text-neutral-50" />
            </div>
            <h1 className="text-xl font-medium">Login</h1>

            <div className="flex flex-col items-center gap-3">
              <input
                className="border border-gray-300/50 p-2 px-5 rounded-lg w-72 focus:outline-2 focus:outline-lime-600/50 hover:shadow-md transition-shadow duration-300 shadow-lime-500/20 hover:border-lime-600/50  focus:bg-neutral-200/50"
                type="text"
                name="username"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <div className="relative w-72">
                <input
                  className="border border-gray-300/50 p-2 px-5 rounded-lg w-full focus:outline-2 focus:outline-lime-600/50 hover:shadow-md transition-shadow duration-300 shadow-lime-500/20 hover:border-lime-600/50  focus:bg-neutral-200/50"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <p>
                Don't have an account?{" "}
                <Link
                  className="hover:underline cursor-pointer hover:text-lime-500"
                  to="/register"
                >
                  Register
                </Link>
              </p>

              <p className="text-center text-sm ">OR Sign in with</p>

              <div className="flex gap-x-3 w-full justify-center">
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaFacebook className="inline text-2xl text-neutral-50" />
                </button>
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaGoogle className="inline text-2xl text-neutral-50" />
                </button>
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaGithub className="inline text-2xl text-neutral-50" />
                </button>
              </div>

              <p className="text-center text-sm ">
                OR continue as{" "}
                <Link
                  to="/home"
                  className="hover:underline hover:text-lime-500"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("userId");
                  }}
                >
                  {" "}
                  Guest
                </Link>
              </p>
              <button
                className="bg-lime-500 text-white p-2 rounded-lg w-40 hover:bg-lime-600 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
